import trim from "lodash.trim";

enum ChooseType {
	FIRST,
	LAST,
}

interface PatternConfig {
	regex: RegExp;
	type: string;
	choose?: ChooseType;
}
interface IPatterns {
	year: PatternConfig;
	resolution: PatternConfig;
	quality: PatternConfig;
	codec: PatternConfig;
	audio: PatternConfig;
	// group: PatternConfig;
	repack: PatternConfig;
	complete: PatternConfig;
	size: PatternConfig;
	internal: PatternConfig;
	remux: PatternConfig;
}

const patterns: IPatterns = {
	year: {
		regex: /([\[\(]?((?:19[0-9]|20[0123])[0-9])[\]\)]?)/gi,
		type: "number",
		choose: ChooseType.LAST,
	},
	resolution: {
		regex: /([0-9]{3,4}p)/gi,
		type: "string",
	},
	audio: {
		regex: /(MP3|DD5\.?1|Dual[\- ]Audio|LiNE|DTS(?:-HD)|AAC[.-]LC|AAC(?:\.?2\.0)?|AC3(?:\.5\.1)?|\dCH|TrueHD(?:.Atmos)?\.7\.1(?:.Atmos)?|Atmos)/gi,
		type: "array",
	},
	quality: {
		regex: /((?:PPV\.)?[HP]DTV|(?:HD)?CAM|B[DR]Rip|(?:HD-?)?TS|(?:PPV )?WEB-?DL(?: DVDRip)?|HDRip|DVDRip|DVDRIP|CamRip|W[EB]BRip|BluRay|DvDScr|hdtv|telesync|HDR\d+\w+|U?HD)/gi,
		type: "array",
	},
	codec: {
		regex: /(xvid|[hx]\.?26[45]|HEVC|AVC)/gi,
		type: "array",
	},
	// group: {
	// 	regex: /(- ?([^-]+(?:-={[^-]+-?$)?))$/gi,
	// 	type: "string",
	// },

	// ---------------------------

	repack: {
		regex: /(REPACK)/gi,
		type: "boolean",
	},
	complete: {
		regex: /(COMPLETE)/gi,
		type: "boolean",
	},
	size: {
		regex: /(\d+(?:\.\d+)?(?:GB|MB))/gi,
		type: "string",
	},
	internal: {
		regex: /(INTERNAL)/gi,
		type: "boolean",
	},
	remux: {
		regex: /(REMUX)/gi,
		type: "boolean",
	},

	// -------------------------
	// region: /R[0-9]/i,
	// extended: /(EXTENDED(:?.CUT)?)/i,
	// hardcoded: /HC/i,
	// proper: /PROPER/i,
	// untouched: /UNTOUCHED/i,
	// container: /(MKV|AVI|MP4)/i,
	// widescreen: /WS/i,
	// website: /^(\[ ?([^\]]+?) ?\])/i,
	// language: /(rus\.eng|ita\.eng)/i,
	// sbs: /(?:Half-)?SBS/i,
	// unrated: /UNRATED/i,
	// "3d": /3D/i,
};

const findGroup = (str: string): string => {
	if (!str.includes(".")) {
		return str;
	}

	const arr = str.split(".");
	return findGroup(arr[arr.length - 1]);
};

const trimFlush = (str: string): string => {
	return trim(trim(str, "."), "-");
};

const flushName = (name: string, remove: string): string => {
	return trimFlush(
		name
			.replace(remove, "")
			.replace(/(\.)\1+/g, "$1")
			.replace(/\.-/g, "")
	);
};

const regexRecursive = (name: string, regexr: RegExp): string[] => {
	let matches;
	const arr = [];
	while ((matches = regexr.exec(name))) {
		if (matches[1]) arr.push(matches[1]);
	}
	return arr;
};

export const parse = (name: string) => {
	let hasExtractedDate = false;
	const torrent: Record<any, any> = {};

	// replace spaces with dots
	name = name.replace(/ /g, ".");
	name = flushName(name, "");

	// keep a copy so that we can filter movie title
	const raw = name;

	// get the group name first TODO: use regex
	const arr = name.split(name.includes("-") ? /-/g : /\./g);
	torrent.group = findGroup(arr[arr.length - 1]);

	// remove group name from name
	name = flushName(name, torrent.group);

	//
	for (const [key, option] of Object.entries(patterns)) {
		let value = regexRecursive(name, option.regex);
		if (value && value.length > 0) {
			// allow us to choose the latest matches (for movies with names in them)
			const chosenValue = option.choose && option.choose === ChooseType.LAST ? value[value.length - 1] : value[0];

			switch (option.type) {
				case "number":
					torrent[key] = parseInt(chosenValue, 10);
					break;
				case "string":
					torrent[key] = chosenValue;
					break;
				case "boolean":
					torrent[key] = chosenValue.length > 0;
					break;
				case "array":
				default:
					torrent[key] = value;
			}

			if (option.choose && option.choose === ChooseType.LAST) {
				name = flushName(name, value[value.length - 1]);
			} else {
				value.map((q: string) => (name = flushName(name, q)));
			}
		}

		// after we have extracted the year, extract the movie title right away
		if (key === "year" && !hasExtractedDate) {
			const splitYearAndName = raw.split(torrent.year);
			torrent.name = trimFlush(splitYearAndName[0]).split(".").join(" ");
			name = flushName(name, splitYearAndName[0]);
			hasExtractedDate = true;
		}
	}

	return torrent;
};
