/** 
* @author Roberto Stefani 
**/
import { forwardRef } from "react";
import countries from "@ares/react-native-ui/locales/countries";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react"; // Aggiunto import mancante

 

 export const ItalianAddress = forwardRef(({trackInternalDetails=false, trackRegion=false, trackProvince=true, provincesAsSymbol=true, style}, ref) => {
    const countryDefinition = countries.IT;
    const { streetAddressFormat } = countryDefinition;
    const [options, setOptions] = useState([]);
     
    const geoApi = {};
    const refAdministrativeRegion = useRef([]);
    const refAdministrativeArea = useRef([]);
    const refCity = useRef([]);
    const refPostalCode = useRef([]);
    const refStreet = useRef([]);
    const refStreetNumber = useRef([]);
    const refInternalDetails = useRef([]);

    // Espone i valori dei sotto-ref attraverso il ref principale
    useEffect(() => {
      if (ref) {
        ref.current = {
          administrativeRegion: refAdministrativeRegion.current,
          administrativeArea: refAdministrativeArea.current,
          city: refCity.current,
          postalCode: refPostalCode.current,
          street: refStreet.current,
          streetNumber: refStreetNumber.current,
          internalDetails: refInternalDetails.current,
          // Funzione per ottenere l'indirizzo completo formattato
          getFullAddress: () => {
            const address = {
              region: refAdministrativeRegion.current?.value,
              province: refAdministrativeArea.current?.value,
              city: refCity.current?.value,
              postalCode: refPostalCode.current?.value,
              street: refStreet.current?.value,
              streetNumber: refStreetNumber.current?.value,
              internalDetails: refInternalDetails.current?.value
            };
            return address;
          }
        };
      }
    }, [ref, refAdministrativeRegion, refAdministrativeArea, refCity, refPostalCode, refStreet, refStreetNumber, refInternalDetails]);
    
    useEffect(()=>{
        const administrative_regions = geoApi(getAdministrativeRegionsByNation(countryDefinition.code));
        const administrative_areas = {};
        administrative_regions.forEach(region => {
            administrative_areas[region.id] = geoApi(getAdministrativeAreasByAdministrativeRegion(region.id));
            administrative_areas[region.id].forEach((area,i) => {
                administrative_areas[region.id][i].administrative_region = region;
            });
        });
        const cities = {};
        const postal_codes = {};
        administrative_areas.forEach(area => {
            cities[area.id] = geoApi(getCitiesByAdministrativeArea(area.id));
            cities[area.id].forEach((city,i) => {
                postal_codes[city.id] = city.postal_codes;
                cities[area.id][i].administrative_area = area; 
            });
        });

        setOptions({
            administrative_regions,
            administrative_areas,
            cities,
            postal_codes,
        });

    }, [setOptions]);
  return (

    <View style={style.wrapper}>
        <Field { ...streetAddressFormat[6]} addOption={false} getValue={(o)=>o.id} getText={(o)=>o.it_name} options={options.administrative_regions} name="administrative_region" component={TextInput} placeholder="Regione" style={style.administrative_region}/>
        <Field { ...streetAddressFormat[5]} addOption={false} getValue={(o)=>o.id} getText={(o)=>o.it_name} options={options.administrative_areas[refAdministrativeRegion.current.value]} name="administrative_area" component={TextInput} placeholder="Provincia" style={style.administrative_area}/>
        <Field { ...streetAddressFormat[4]} addOption={false} getValue={(o)=>o.id} getText={(o)=>o.it_name} options={options.cities[refAdministrativeArea.current.value]} name="city" component={TextInput} placeholder="Comune" style={style.city}/>
        <Field { ...streetAddressFormat[3]} addOption={false} getValue={(o)=>o.id} getText={(o)=>o.it_name} options={options.postal_codes[refCity.current.value]} name="postal_code" component={TextInput} placeholder="CAP" style={style.cap}/>
        <Field { ...streetAddressFormat[0]} addOption={true}   name="street" component={TextInput} placeholder="Via, piazza, etc..." style={style.street}/>
        <Field { ...streetAddressFormat[1]} addOption={true}   name="street_number" component={TextInput} placeholder="Numero civico" style={style.streetNumber}/>
        <Field { ...streetAddressFormat[2]} addOption={true}   name="internal_details" component={TextInput} placeholder="Interno" style={style.internalDetails}/>
    </View>

  )
  
 });