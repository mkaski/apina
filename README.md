# APINA

_Application Programming Interface N/A_

Mock and cache API responses locally from a URL. Ease development with external APIs with large payload.

APINA fetches and stores HTTP responses to `./apina_cache` and serves a stored response on port `:5454`.

## Use

```sh
$ yarn add apina -D
```

```sh
$ yarn apina <url>
```

### Example

```sh
$ yarn apina https://jsonplaceholder.typicode.com/comments
Local version not found. Saving in cache: ./apina_cache/https___jsonplaceholder_typicode_com_todos
Apina mocking on port 5454
```
