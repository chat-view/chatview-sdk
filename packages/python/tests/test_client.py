import json

import httpx
import pytest

from chatview import ChatViewApiError, ChatViewClient


@pytest.fixture
def client():
    return ChatViewClient(api_token="test-token")


def test_create_content(client, httpx_mock):
    httpx_mock.add_response(
        method="POST",
        url="https://chat-view.com/api/contents",
        status_code=201,
        json={
            "title": "Demo",
            "url": "https://chat-view.com/s/abc",
            "share_token": "abc",
            "password_protected": True,
            "password": "pass",
            "expires_at": None,
        },
    )
    result = client.create_content(
        raw_html="<p>hello</p>",
        title="Demo",
        source_platform="ChatGPT",
    )
    assert result["share_token"] == "abc"
    request = httpx_mock.get_requests()[0]
    assert request.headers["authorization"] == "Bearer test-token"
    body = json.loads(request.content)
    assert body["raw_html"] == "<p>hello</p>"


def test_upload_attachment(client, httpx_mock):
    httpx_mock.add_response(
        method="POST",
        url="https://chat-view.com/api/attachments",
        status_code=201,
        json={"id": 99},
    )
    result = client.upload_attachment(b"fake-png", filename="shot.png")
    assert result["id"] == 99


def test_create_content_with_attachments(client, httpx_mock):
    httpx_mock.add_response(
        method="POST",
        url="https://chat-view.com/api/attachments",
        status_code=201,
        json={"id": 1},
    )
    httpx_mock.add_response(
        method="POST",
        url="https://chat-view.com/api/contents",
        status_code=201,
        json={
            "title": None,
            "url": "https://chat-view.com/s/x",
            "share_token": "x",
            "password_protected": False,
            "password": None,
            "expires_at": None,
        },
    )
    client.create_content_with_attachments(
        [b"file"],
        raw_html="<p>x</p>",
    )
    content_req = httpx_mock.get_requests()[-1]
    body = json.loads(content_req.content)
    assert body["metadata"]["attachments"] == [1]


def test_api_error(client, httpx_mock):
    httpx_mock.add_response(
        method="POST",
        url="https://chat-view.com/api/contents",
        status_code=401,
        json={"message": "Unauthorized."},
    )
    with pytest.raises(ChatViewApiError) as exc:
        client.create_content(raw_html="<p>x</p>")
    assert exc.value.is_unauthorized


def test_missing_token():
    with pytest.raises(ValueError, match="token"):
        ChatViewClient(api_token=None)
