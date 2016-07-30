export class Weather {
    	private static kelvinToCelsiusFactor = -272.15;
		
		temp : number; 
        pressure: number; 
        humidity : number;
        temp_min : number; 
        temp_max : number; 
        icon : string;

		constructor(data: any) {
			this.fill(data);
		}

		fill(data : any) : void {
			this.temp = data.main.temp + Weather.kelvinToCelsiusFactor; 
			this.pressure = data.main.pressure;
			this.humidity = data.main.humidity;
			this.temp_min = data.main.temp_min + Weather.kelvinToCelsiusFactor; 
			this.temp_max = data.main.temp_max + Weather.kelvinToCelsiusFactor;
			this.icon = data.weather[0].icon;
		}
		
		get weatherIcon() : string {
			if (this.icon == null) 
			{
				return "";
			}

			return "http://openweathermap.org/img/w/" + this.icon + ".png";
		}
} 