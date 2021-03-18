import { parse } from "..";

describe("test parser", () => {
	test("should parse string", () => {
		expect(parse("Kidnapped.1971.Complete.BluRay-ESX")).toMatchObject({
			group: "ESX",
			year: 1971,
			name: "Kidnapped",
			quality: ["BluRay"],
			complete: true,
		});

		expect(parse("Kidnapped.1971.1080p.BluRay.x264-ESX")).toMatchObject({
			group: "ESX",
			year: 1971,
			name: "Kidnapped",
			resolution: "1080p",
			quality: ["BluRay"],
			codec: ["x264"],
		});

		expect(parse("Kidnapped.1971.720p.BluRay.x264-ESX")).toMatchObject({
			group: "ESX",
			year: 1971,
			name: "Kidnapped",
			resolution: "720p",
			quality: ["BluRay"],
			codec: ["x264"],
		});

		expect(parse("Kidnapped.1971.INTERNAL.BDRip.x264-ESX")).toMatchObject({
			group: "ESX",
			year: 1971,
			name: "Kidnapped",
			quality: ["BDRip"],
			codec: ["x264"],
			internal: true,
		});

		expect(parse("Wonder.Woman.1984.2020.MULTi.2160p.UHD.BluRay.x265-SESKAPiLE")).toMatchObject({
			group: "SESKAPiLE",
			year: 2020,
			name: "Wonder Woman 1984",
			resolution: "2160p",
			quality: ["UHD", "BluRay"],
			codec: ["x265"],
		});

		expect(parse("The.Balkan.Line.2019.MULTi.COMPLETE.BLURAY-GMB")).toMatchObject({
			group: "GMB",
			year: 2019,
			name: "The Balkan Line",
			quality: ["BLURAY"],
			complete: true,
		});

		expect(parse("Justice.League.Snyders.Cut.2021.1080p.Untouched.HD.AVC.x264.AAC-NGP")).toMatchObject({
			group: "NGP",
			year: 2021,
			name: "Justice League Snyders Cut",
			resolution: "1080p",
			audio: ["AAC"],
			quality: ["HD"],
			codec: ["AVC", "x264"],
		});

		expect(parse("News.of.the.World.2020.UHD.BluRay.2160p.TrueHD.Atmos.7.1.HEVC.REMUX-FraMeSToR")).toMatchObject({
			group: "FraMeSToR",
			year: 2020,
			name: "News of the World",
			resolution: "2160p",
			audio: ["TrueHD.Atmos.7.1"],
			quality: ["UHD", "BluRay"],
			codec: ["HEVC"],
			remux: true,
		});

		expect(parse("Dark.Web.Cicada.3301.2021.COMPLETE.BLURAY-iNTEGRUM")).toMatchObject({
			group: "iNTEGRUM",
			year: 2021,
			name: "Dark Web Cicada 3301",
			quality: ["BLURAY"],
			complete: true,
		});

		expect(parse("Wonder.Woman.1984.2020.iNTERNAL.HDR10Plus.2160p.UHD.BluRay.x265-SURCODE")).toMatchObject({
			group: "SURCODE",
			year: 2020,
			name: "Wonder Woman 1984",
			resolution: "2160p",
			quality: ["HDR10Plus", "UHD", "BluRay"],
			codec: ["x265"],
			internal: true,
		});

		expect(parse("Wonder.Woman.1984.2020.REPACK.720p.BluRay.x264-SURCODE")).toMatchObject({
			group: "SURCODE",
			year: 2020,
			name: "Wonder Woman 1984",
			resolution: "720p",
			quality: ["BluRay"],
			codec: ["x264"],
			repack: true,
		});

		expect(parse("Dark.Web.Cicada.3301.2021.1080p.BluRay.x264-PiGNUS")).toMatchObject({
			group: "PiGNUS",
			year: 2021,
			name: "Dark Web Cicada 3301",
			resolution: "1080p",
			quality: ["BluRay"],
			codec: ["x264"],
		});

		expect(parse("Dark.Web.Cicada.3301.2021.BDRip.x264-PiGNUS")).toMatchObject({
			group: "PiGNUS",
			year: 2021,
			name: "Dark Web Cicada 3301",
			quality: ["BDRip"],
			codec: ["x264"],
		});

		expect(parse("Justice League Snyders Cut 2021 1080p HDRip X264-WORM")).toMatchObject({
			group: "WORM",
			year: 2021,
			name: "Justice League Snyders Cut",
			resolution: "1080p",
			quality: ["HDRip"],
			codec: ["X264"],
		});

		expect(parse("Justice.League.Snyders.Cut.2021.1080p.WEBRip.PD")).toMatchObject({
			group: "PD",
			year: 2021,
			name: "Justice League Snyders Cut",
			resolution: "1080p",
			quality: ["WEBRip"],
		});

		expect(parse("Zack.Snyder’s.Justice.League.2021.INTERNAL.720p.HDRip.2CH.x265.HEVC-PSA")).toMatchObject({
			group: "PSA",
			year: 2021,
			name: "Zack Snyder’s Justice League",
			resolution: "720p",
			audio: ["2CH"],
			quality: ["HDRip"],
			codec: ["x265", "HEVC"],
			internal: true,
		});

		expect(parse("Zack Snyder’s Justice League 2021 720p WEB-DL x264 900MB - MkvHub")).toMatchObject({
			group: "MkvHub",
			year: 2021,
			name: "Zack Snyder’s Justice League",
			resolution: "720p",
			quality: ["WEB-DL"],
			codec: ["x264"],
			size: "900MB",
		});

		expect(parse("Justice League Snyders Cut 2021 480p X264-RMTeam")).toMatchObject({
			group: "RMTeam",
			year: 2021,
			name: "Justice League Snyders Cut",
			resolution: "480p",
			codec: ["X264"],
		});

		expect(parse("Monster.Hunter.2020.1080p.BluRay.REMUX.AVC.DTS-HD.MA.TrueHD.7.1.Atmos-FGT")).toMatchObject({
			group: "FGT",
			year: 2020,
			name: "Monster Hunter",
			resolution: "1080p",
			audio: ["DTS-HD", "TrueHD.7.1.Atmos"],
			quality: ["BluRay"],
			codec: ["AVC"],
			remux: true,
		});
	});
});
