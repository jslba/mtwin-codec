const Codec = require("../source/index");

const text = {
	key: "5D5s2UPh",
	decoded: [
		"Hello World",
		'{"json":"sample","foo":[3,"bar","baz",12]}',
		"some stuff is here",
		"oy6:_leveli11y5:_bitss3:mgcy5:_namey9:SaintOlafy2:_afy2:_ly2:fry2:_si42537935g",
	],
	encoded: [
		'=Z"\x1Db\x177&Wg\fRFef',
		"\x0E\x1D$\x02bYBs\x07x\t/\nKA[_=N\x05\x02y\x0EAP~\x1Dc|uDHq&CKx[e;\x1E\x12Qu15",
		"\x06P#\x14-D\x14<CmH+\t\x07L\x1C\x01zzVZj",
		`\x1AFxKR[\x05?@g\x01sK^\x11C,}A\x1E\x1E(\x07 \x0E5\\x(=9\n2)GHcM\x07h*\x01\x06.\x11'\x02@\x01vg\x15\r.FS\x1A#E}a]\bX!b=\x01"\x03D\x010\x18e\x12\baUFX0`,
	],
};

test("encode", function () {
	let instance = new Codec(text.key);
	for (let i = 0; i < text.decoded.length; i++) {
		expect(instance.encode(text.decoded[i])).toStrictEqual(text.encoded[i]);
	}
});

test("encode", function () {
	let instance = new Codec(text.key);
	for (let i = 0; i < text.decoded.length; i++) {
		expect(instance.decode(text.encoded[i])).toStrictEqual(text.decoded[i]);
	}
});
