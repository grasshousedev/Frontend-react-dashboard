// These values can be set in current files:
// .env.development.local                      not committed, development values
// .env.development                            committed, development values
// .env.production.local                       not committed, production values
// .env.production                             committed, production values

// All the previous are with precedence from top to bottom, and overrides:
// .env                                        committed in repo, default values

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
