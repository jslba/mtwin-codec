# [Codec][index] implement of Codec

![npm](https://img.shields.io/npm/v/mtwin-codec?color=blue&style=flat)
![tests](https://img.shields.io/static/v1?label=tests&message=2%20passed&color=brightgreen&style=flat)
![GitHub](https://img.shields.io/github/license/jslba/mtwin-codec?style=flat)

This is the second generation of the  Codec used by [Motion Twin][mt] to encrypt
`client<>server` exchanges in their games.

> **Note**   
> If you are looking  for how to  use it, you  can look at some  examples in the
> [unit tests][unittests].

## Constructor

```hx
// generate `this.codec` (length 255) from key and version.
new Codec(key: String, ?version: String = "")
```

## Variables

```hx
private b64: Array
```

```hx
private codec: Array
```

## Methods

```hx
// return the encoding of `data` according to `this.codec` as a string.
public encode(data: String): String
```

```hx
// return the decoding of `data` according to `this.codec` as a string.
public decode(data: String): String
```

```hx
private code(data: String, ?mode: Int = 0): String
```

[index]: /source/index.js
[mt]: https://motion-twin.com/fr/
[unittests]: /test/rand.test.js
