export const getItemDefaultValue = (params:any) => {
  const {modalType, name, itemData} = params;
  if (modalType === 'add') {
    return '';
  }
  let value = (itemData || {})[name];
  if (value === true) {
    return '1';
  } else if (value === false) {
    return '0';
  }
  return (itemData || {})[name];
};

export const dealEmptyField = (fieldsValue:any) => {
  for (var key in fieldsValue) {
    if (!fieldsValue[key]) {
      delete fieldsValue[key];
    }
  }
};

