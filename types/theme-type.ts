export type Color = string;
export type ColorScale = Array<Color>;
export type ThemeInput = {
	light: ColorScale;
	dark?: ColorScale;
} | {
	light?: ColorScale;
	dark: ColorScale;
};