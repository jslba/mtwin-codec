class Codec {
	#b64;
	#codec;

	constructor(key, version = "") {
		let fkey = [...(version + key)].map((v) => v.charCodeAt()),
			codec = Array.from({ length: 256 }, (v, k) => k & 0x7f),
			b64 = [
				...Array.from({ length: 26 }, (v, k) => k + 97), // a-z
				...Array.from({ length: 26 }, (v, k) => k + 65), // A-Z
				...Array.from({ length: 10 }, (v, k) => k + 48), // 0-9
				45, // -
				95, // _
			],
			j = 0;

		for (let i = 0; i < codec.length; i++) {
			j = (j + codec[i] + fkey[i % fkey.length]) & 0x7f;
			[codec[i], codec[j]] = [codec[j], codec[i]];
		}

		this.#b64 = b64;
		this.#codec = codec;
	}

	// mode 0 = encode, 1 = decode
	#code(data, mode = 0) {
		let d = [...data].map((v) => v.charCodeAt()),
			l = mode > 0 ? d.length - 4 : d.length,
			x = this.#codec[0],
			y = this.#codec[1],
			buf = [],
			chk = [];

		for (let i = 0; i < l; i++) {
			let b = data.charCodeAt(i),
				t = b ^ this.#codec[i & 0xff];
			buf.push(t != 0 ? t : b);
			x = (x + (mode > 0 && t != 0 ? b : t)) % 0xfff1;
			y = (y + x) % 0xfff1;
		}

		let c = x ^ (y << 8);
		chk.push(
			this.#b64[c & 0x3f],
			this.#b64[(c >> 6) & 0x3f],
			this.#b64[(c >> 12) & 0x3f],
			this.#b64[(c >> 18) & 0x3f],
		);

		return { buffer: buf, chk: chk };
	}

	decode(data) {
		let r = this.#code(data, 1),
			nc = String.fromCharCode(...r.chk),
			cc = data.slice(-4);

		if (nc != cc) {
			throw "FCHK (" + nc + " != " + cc + ")";
		}

		return String.fromCharCode(...r.buffer);
	}

	encode(data) {
		let r = this.#code(data, 0);
		return String.fromCharCode(...r.buffer, ...r.chk);
	}
}

module.exports = Codec;
