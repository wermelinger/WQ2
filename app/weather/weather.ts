export class Weather {
    	private static kelvinToCelsiusFactor = -272.15;
		
		constructor(public temp : number, 
                    public pressure: number, 
                    public humidity : number,
                    public temp_min : number, 
                    public temp_max : number, 
                    public icon : string) {
		
		}
		
		get weatherIcon() : string {
			return "http://openweathermap.org/img/w/" + this.icon + ".png";
		}
} 