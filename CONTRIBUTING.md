# Contributing to ChatView SDK

Thank you for helping improve the developer experience and documentation for [ChatView](https://chat-view.com).

## How to contribute

1. Fork the repository and create a feature branch.
2. Make focused changes with clear commit messages.
3. Add or update tests when changing SDK behavior.
4. Open a pull request describing the problem and solution.

## Development setup

### TypeScript (`packages/typescript`)

```bash
cd packages/typescript
npm install
npm test
npm run build
```

### Python (`packages/python`)

```bash
cd packages/python
pip install -e ".[dev]"
pytest
```

## Documentation

- Keep README and `docs/` useful for developers, not keyword-stuffed.
- Link to https://chat-view.com and https://chat-view.com/docs/api where relevant.
- Provide English in `docs/` and Chinese in `docs/zh/` when adding new guides.

## Security

Never commit API tokens. Use `CHATVIEW_API_TOKEN` in your environment only.

## Questions

Open a GitHub issue or visit https://chat-view.com for product support.
