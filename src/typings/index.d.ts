export enum ChooseType {
	FIRST,
	LAST,
}
export interface PatternConfig {
	regex: RegExp;
	type: string;
	choose?: ChooseType;
}

export interface IPatterns {
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

export interface ParsedData {
	[keyof IPatterns]: any;
}