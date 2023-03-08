export const filterQuery = (query: any) => {
  try {
    // initializing filter
    let _where = {};
    //checking if filter query exists and changing the operators suitable for mongoose query

    let filters: any;
    if (query?.filters) {
      filters = JSON.parse(query.filters);
      let operator = filters[0].operatorValue;
      switch (operator) {
        case "=":
        case "equals":
          _where = {
            [filters[0].columnField]: {
              $eq: filters[0].value,
            },
          };
          break;
        case "!=":
          _where = {
            [filters[0].columnField]: {
              $ne: filters[0].value,
            },
          };
          break;
        case ">":
        case "is after":
        case "isAfter":
          _where = {
            [filters[0].columnField]: {
              $gt: filters[0].value,
            },
          };
          break;
        case ">=":
        case "is on or after":
        case "isOnOrAfter":
          _where = {
            [filters[0].columnField]: {
              $gte: filters[0].value,
            },
          };
          break;
        case "<":
        case "is before":
        case "isBefore":
          _where = {
            [filters[0].columnField]: {
              $lt: filters[0].value,
            },
          };
          break;
        case "<=":
        case "is on or before":
        case "isOnOrBefore":
          _where = {
            [filters[0].columnField]: {
              $lte: filters[0].value,
            },
          };
          break;
        case "is any of":
        case "isAnyOf":
          _where = {
            [filters[0].columnField]: {
              $in: filters[0].value,
            },
          };
          break;

        default:
          break;
      }
    }

    return _where;
  } catch (error) {
    return error;
  }
};
