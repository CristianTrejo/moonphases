'use strict'

const moment = require('moment')

class MoonphaseController {
    getMontMoonPhases({params, response}){
        try {
            // Validar que los parametros sean correctos
            this.validateYearParam(params.year)
            this.validateMonthParam(params.month)

            // Obtener la cantidad de dias en un mes, octubre = 31
            const daysInMonth = moment(params.year + '-' + params.month).daysInMonth()

            var moonAges = []
            var moonPhases = {
                newMoon: [],
                firstQuarter: [],
                waxingCrescent: [],
                waxingGibbous: [],
                fullMoon: [],
                waningGibbous: [],
                thirdQuarter: [],
                waningCrescent: []
            }

            //Recorrer los dias del mes
            for (let x = 0; x < daysInMonth; x++) {
                // X + 1 = dia del mes
                var moonAge = this.calculateMoonAge(params.year, params.month, x + 1)

                // Si la edad lunar es 0 o 29 dias => newMoon
                if (moonAge === 0 || moonAge === 29) {
                    moonPhases.newMoon.push(x + 1)
                }
                // Dias intermedios de newMoon y firstQuarter => WaxingCrescent
                if (moonAge > 0 && moonAge < 7) {
                    moonPhases.waxingCrescent.push(x + 1)
                }
                // edad lunar es 7 => firstQuarter
                if (moonAge === 7) {
                    moonPhases.firstQuarter.push(x + 1)
                }
                // Dias intermedios de firstQuarter y FullMoon => WaxingGibbous
                if (moonAge > 7 && moonAge < 14) {
                    moonPhases.waxingGibbous.push(x + 1)
                }
                // edad lunar es 14 => FullMoon
                if (moonAge === 14) {
                    moonPhases.fullMoon.push(x + 1)
                }
                // Dias intermedios de FullMoon y thirdQuarter => WaningGibbous
                if (moonAge > 14 && moonAge < 21) {
                    moonPhases.waningGibbous.push(x + 1)
                }
                // edad lunar es 21 => thirdQuarter
                if (moonAge === 21) {
                    moonPhases.thirdQuarter.push(x + 1)
                }
                // Dias intermedios de thirdQuarter y newMoon => waningCrescent
                if (moonAge > 21 && moonAge < 29) {
                    moonPhases.waningCrescent.push(x + 1)
                }
            }

            return response.json({ moonPhases })
        } catch (error) {
            return response.status(400).json({ message: error.message })
        }
    }

    getNewMoons({params, response}){
        try {
            this.validateYearParam(params.year)
            var firstDate = moment(params.year + '-01-01')
            var lastDate = moment(parseInt(params.year) + 1 + '-01-01')

            var dates = []
            for (var m = moment(firstDate); m.isBefore(lastDate); m.add(1, 'days')) {
                let month = m.month() + 1
                let day = m.date()
                var moonAge = this.calculateMoonAge(params.year, month, day)
                if (moonAge === 0 || moonAge === 29) {
                    dates.push(m.format('MMM Do'))
                }
            }

            return response.json({ newMoon: dates })
        } catch (error) {
            return response.status(400).json({ message: error.message })
        }
    }

    getFullMoons({params, response}) {
        try {
            this.validateYearParam(params.year)
            var firstDate = moment(params.year + '-01-01')
            var lastDate = moment(parseInt(params.year) + 1 + '-01-01')

            var dates = []
            for (var m = moment(firstDate); m.isBefore(lastDate); m.add(1, 'days')) {
                let month = m.month() + 1
                let day = m.date()
                var moonAge = this.calculateMoonAge(params.year, month, day)
                if (moonAge === 14) {
                    dates.push(m.format('MMM Do'))
                }
            }

            return response.json({ fullMoon: dates })
        } catch (error) {
            return response.status(400).json({ message: error.message })
        }
    }





    // |=======================================================================|
    // |==============            Metodos reutilizables                 =======|
    // |=======================================================================|

    calculateMoonAge(year, month, day) {
        var moonAge = 0
        var actualYear = parseInt(year)
        var monthCorrection = 0
        var epacta = 0

        // Epacta se repite cada 19 años, por lo tanto 2020 + 2001
        if (year > 2018 && year < 2038) {
            actualYear = year - 19
        }
        if (year >= 2038) {
            actualYear = year - (19 * 2)
        }

        // 1982 + 2001
        if (year < 2000 && year > 1980) {
            actualYear = parseInt(year) + 19
        }
        if (year < 1981) {
            actualYear = parseInt(year) + (19 * 2)
        }

        // Epacta se repite cada 19 años y se toman los siguientes valores
        switch (actualYear) {
            case 2000: epacta = 24; break;
            case 2001: epacta = 5; break;
            case 2002: epacta = 16; break;
            case 2003: epacta = 28; break;
            case 2004: epacta = 9; break;
            case 2005: epacta = 20; break;
            case 2006: epacta = 1; break;
            case 2007: epacta = 12; break;
            case 2008: epacta = 22; break;
            case 2009: epacta = 3; break;
            case 2010: epacta = 15; break;
            case 2011: epacta = 25; break;
            case 2012: epacta = 7; break;
            case 2013: epacta = 18; break;
            case 2014: epacta = 0; break;
            case 2015: epacta = 11; break;
            case 2016: epacta = 22; break;
            case 2017: epacta = 2; break;
            case 2018: epacta = 14; break;
            default: throw { message: 'The year is not valid' }; break;
        }


        // La corrección mensual es un valor numérico que se toma de la tabla siguiente
        // 1-ene
        // 2-feb
        switch (parseInt(month)) {
            case 1: monthCorrection = 0; break;
            case 2: monthCorrection = 1; break;
            case 3: monthCorrection = 0; break;
            case 4: monthCorrection = 1; break;
            case 5: monthCorrection = 2; break;
            case 6: monthCorrection = 3; break;
            case 7: monthCorrection = 4; break;
            case 8: monthCorrection = 5; break;
            case 9: monthCorrection = 6; break;
            case 10: monthCorrection = 7; break;
            case 11: monthCorrection = 8; break;
            case 12: monthCorrection = 9; break;
        }

        // Edad de la Luna = Epacta + Corrección Mensual + día del mes
        moonAge = epacta + monthCorrection + day

        // si la edad de la luna es igual o mayor a 30 restarle 30 para obtener la edad 
        return moonAge >= 30 ? moonAge - 30 : moonAge
    }

    validateYearParam (param) {
        if (!param) throw { message: 'You must send the year param' }

        if (!Number.isInteger(parseFloat(param))) {
            throw { message: 'The year param must be an integer number' }
        }
        var reg = /^\d+$/;
        if (!reg.test(param)) {
            throw { message: 'The year param must be an integer number, not letters' }
        }
    }

    validateMonthParam (param) {
        if (!param) throw { message: 'You must send the month param' }

        if (parseInt(param) > 12 || parseInt(param) < 0) {
            throw { message: 'The month number must be between 1 or 12' }
        }

        if (!Number.isInteger(parseFloat(param))) {
            throw { message: 'The month param must be an integer number' }
        }
        var reg = /^\d+$/;
        if (!reg.test(param)) {
            throw { message: 'The month param must be an integer number, not letters' }
        }
    }
}

module.exports = MoonphaseController
