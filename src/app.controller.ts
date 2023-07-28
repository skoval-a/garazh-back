import { Body, Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { AppService } from './app.service';
import { ApiOkResponse } from "@nestjs/swagger";
import { UserEntity } from "./users/user.entity";
import { Country, State, City }  from 'country-state-city';
import { All_CITIES_BY_COUNTRY, COUNTRIES } from "./constants/countries";
import { AuthenticateDto } from "./auth/dto/authenticate.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get('countries/')
  @ApiOkResponse()
  getAllCountries(): any[] {
    return COUNTRIES;
  }

  @Get('getCitiesByCountry/:country')
  @ApiOkResponse()
  getCitiesByCountry(@Param('country') countryParam: string) {

    if (All_CITIES_BY_COUNTRY[countryParam]) {
      return All_CITIES_BY_COUNTRY[countryParam];

    } else {
      throw new HttpException(
        "Такоі краіни не існує",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
