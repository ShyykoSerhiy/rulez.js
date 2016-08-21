declare module 'rulez.js' {
	export interface DivisionConfig {
		strokeWidth?: number,
		type?: 'rect'|'line',
		className?: string,
		pixelGap?: number,
		lineLength?: number,
		renderer?: (el:Element)=>{}
	}
	export interface TextConfig {
		rotation?: number,
		offset?: number,
		className?: string,
		/**
		 * Wherever to show or not to show units alongside text
		 */
		showUnits?: boolean,
		centerText?: {
			by?: 'width'|'height',
			operation?: 'sub'|'sum'
		},
		renderer?: (el:Element)=>{}
	}
	export interface RulezConfig {
		width?: number,
		height?: number,
		element: Element|any,
		layout?: 'horizontal'| 'vertical',
		alignment?: 'top'|'left'|'right'|'bottom',
		units?: 'em'|'ex'|'px'|'pt'|'pc'|'cm'|'mm'|'in'|'',
		divisionDefaults?: DivisionConfig,
		textDefaults?: TextConfig,
		divisions?: DivisionConfig[],
		texts?: TextConfig[]
	}
	class Rulez {
		constructor(config:RulezConfig);

		getUnitConversionRate:() => number;
		render:() => void;
		resize:() => void;
		saveAsImage:(saveFinishCallback:(imageDataUrl:string)=> void) => void;
		scrollTo:(pos:number, useUnits:boolean) => void;
		setScale:(scaleValue:number) => void;
	}
	export default Rulez;
}