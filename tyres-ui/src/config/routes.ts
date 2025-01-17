import { ETermsSlugged } from "./terms";

// Page routes
export const ROUTE_PAGE_ROOT = "http://localhost:8123";
export const ROUTE_PAGE_RESOURCES = `/${ETermsSlugged.Resources}`;
export const ROUTE_PAGE_I18N = `${ROUTE_PAGE_RESOURCES}/${ETermsSlugged.i18n}`;
export const ROUTE_PAGE_FEATURE_FLAGS = `${ROUTE_PAGE_RESOURCES}/${ETermsSlugged.FeatureFlags}`;
export const ROUTE_PAGE_DICTIONARIES = `${ROUTE_PAGE_RESOURCES}/${ETermsSlugged.Dictionaries}`;
export const ROUTE_PAGE_COVERAGE = `/${ETermsSlugged.Coverage}`;
export const ROUTE_PAGE_HOME = "/";

// API routes
export const ROUTE_API_LOCAL = "http://localhost:8123/api";
export const ROUTE_API_DICTIONARIES = `${ROUTE_API_LOCAL}/${ETermsSlugged.Dictionaries}`;
export const ROUTE_API_FEATURE_FLAGS = `${ROUTE_API_LOCAL}/${ETermsSlugged.FeatureFlags}`;
export const ROUTE_API_I18N = `${ROUTE_API_LOCAL}/${ETermsSlugged.i18n}`;
export const ROUTE_API_PATHS = `${ROUTE_API_LOCAL}/${ETermsSlugged.Paths}`;
export const ROUTE_API_COVERAGE = `${ROUTE_API_LOCAL}/${ETermsSlugged.Coverage}`;
export const ROUTE_API_INIT = `${ROUTE_API_LOCAL}/${ETermsSlugged.Init}`;
export const ROUTE_API_INIT_CHECK = `${ROUTE_API_LOCAL}/${ETermsSlugged.Init}/${ETermsSlugged.Check}`;
export const ROUTE_API_CONFIG = `${ROUTE_API_LOCAL}/${ETermsSlugged.Config}`;

// Action routes
export const ROUTE_ACTION_NEW = "new";
