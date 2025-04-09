import { RESTConnection } from '@ares/core/datasources.js';

export const name = "aresgeo";
export const environments = {
  test: {
    geoApiConnection: {
      driver: RESTConnection,
      host: 'http://localhost:3333', // Assuming the ecosystem-microservices-geo runs on port 3333
    }
  },
  production: {
    geoApiConnection: {
      driver: RESTConnection,
      host: 'https://api.ares-geo.com', // Replace with your production API URL
    }
  }
};

export const queries = {
  // Nations
  getNations: {
    name: 'getNations',
    connectionSetting: 'geoApiConnection',
    method: 'GET',
    query: '/ares/nations',
    parametersValidationRoles: (req, aReS) => ({}),
    mapParameters: (req) => ({})
  },
  getNationById: {
    name: 'getNationById',
    connectionSetting: 'geoApiConnection',
    method: 'GET',
    query: '/ares/nations/:id',
    parametersValidationRoles: (req, aReS) => ({
      id: {
        type: 'number',
        required: true,
        source: (req) => req.parameters.id
      }
    }),
    mapParameters: (req) => ({
      id: req.parameters.id
    })
  },
  createNation: {
    name: 'createNation',
    connectionSetting: 'geoApiConnection',
    method: 'POST',
    query: '/ares/nations',
    parametersValidationRoles: (req, aReS) => ({
      id: { type: 'number', required: true, source: (req) => req.parameters.id },
      en_name: { type: 'text', required: true, source: (req) => req.parameters.en_name },
      it_name: { type: 'text', required: true, source: (req) => req.parameters.it_name },
      iso_code: { type: 'text', required: true, source: (req) => req.parameters.iso_code },
      continent: { type: 'text', required: true, source: (req) => req.parameters.continent }
    }),
    mapParameters: (req) => ({
      id: req.parameters.id,
      en_name: req.parameters.en_name,
      it_name: req.parameters.it_name,
      iso_code: req.parameters.iso_code,
      continent: req.parameters.continent
    })
  },
  
  // Administrative Regions
  getAdministrativeRegionsByNation: {
    name: 'getAdministrativeRegionsByNation',
    connectionSetting: 'geoApiConnection',
    method: 'GET',
    query: '/ares/administrative-regions/by-nation/:nation_id',
    parametersValidationRoles: (req, aReS) => ({
      nation_id: {
        type: 'number',
        required: true,
        source: (req) => req.parameters.nation_id
      }
    }),
    mapParameters: (req) => ({
      nation_id: req.parameters.nation_id
    })
  },
  getAdministrativeRegionById: {
    name: 'getAdministrativeRegionById',
    connectionSetting: 'geoApiConnection',
    method: 'GET',
    query: '/ares/administrative-regions/:id',
    parametersValidationRoles: (req, aReS) => ({
      id: {
        type: 'number',
        required: true,
        source: (req) => req.parameters.id
      }
    }),
    mapParameters: (req) => ({
      id: req.parameters.id
    })
  },
  createAdministrativeRegion: {
    name: 'createAdministrativeRegion',
    connectionSetting: 'geoApiConnection',
    method: 'POST',
    query: '/ares/administrative-regions',
    parametersValidationRoles: (req, aReS) => ({
      id: { type: 'number', required: true, source: (req) => req.parameters.id },
      en_name: { type: 'text', required: true, source: (req) => req.parameters.en_name },
      it_name: { type: 'text', required: true, source: (req) => req.parameters.it_name },
      nation_id: { type: 'number', required: true, source: (req) => req.parameters.nation_id },
      type: { type: 'text', required: true, source: (req) => req.parameters.type }
    }),
    mapParameters: (req) => ({
      id: req.parameters.id,
      en_name: req.parameters.en_name,
      it_name: req.parameters.it_name,
      nation_id: req.parameters.nation_id,
      type: req.parameters.type
    })
  },
  
  // Administrative Areas
  getAdministrativeAreasByAdministrativeRegion: {
    name: 'getAdministrativeAreasByAdministrativeRegion',
    connectionSetting: 'geoApiConnection',
    method: 'GET',
    query: '/ares/administrative-areas/by-administrative-region/:administrative_region_id',
    parametersValidationRoles: (req, aReS) => ({
      administrative_region_id: {
        type: 'number',
        required: true,
        source: (req) => req.parameters.administrative_region_id
      }
    }),
    mapParameters: (req) => ({
      administrative_region_id: req.parameters.administrative_region_id
    })
  },
  getAdministrativeAreaById: {
    name: 'getAdministrativeAreaById',
    connectionSetting: 'geoApiConnection',
    method: 'GET',
    query: '/ares/administrative-areas/:id',
    parametersValidationRoles: (req, aReS) => ({
      id: {
        type: 'number',
        required: true,
        source: (req) => req.parameters.id
      }
    }),
    mapParameters: (req) => ({
      id: req.parameters.id
    })
  },
  createAdministrativeArea: {
    name: 'createAdministrativeArea',
    connectionSetting: 'geoApiConnection',
    method: 'POST',
    query: '/ares/administrative-areas',
    parametersValidationRoles: (req, aReS) => ({
      id: { type: 'number', required: true, source: (req) => req.parameters.id },
      en_name: { type: 'text', required: true, source: (req) => req.parameters.en_name },
      it_name: { type: 'text', required: true, source: (req) => req.parameters.it_name },
      surface_kmq: { type: 'number', required: false, source: (req) => req.parameters.surface_kmq },
      symbol: { type: 'text', required: false, source: (req) => req.parameters.symbol },
      administrative_region_id: { type: 'number', required: true, source: (req) => req.parameters.administrative_region_id },
      type: { type: 'text', required: true, source: (req) => req.parameters.type }
    }),
    mapParameters: (req) => ({
      id: req.parameters.id,
      en_name: req.parameters.en_name,
      it_name: req.parameters.it_name,
      surface_kmq: req.parameters.surface_kmq,
      symbol: req.parameters.symbol,
      administrative_region_id: req.parameters.administrative_region_id,
      type: req.parameters.type
    })
  },
  
  // Cities
  getCitiesByAdministrativeArea: {
    name: 'getCitiesByAdministrativeArea',
    connectionSetting: 'geoApiConnection',
    method: 'GET',
    query: '/ares/cities/by-administrative-area/:administrative_area_id',
    parametersValidationRoles: (req, aReS) => ({
      administrative_area_id: {
        type: 'number',
        required: true,
        source: (req) => req.parameters.administrative_area_id
      }
    }),
    mapParameters: (req) => ({
      administrative_area_id: req.parameters.administrative_area_id
    })
  }
};