const commonStyles = {
    text: '',
    icon: 'text-gray-600',
    error: 'text-red-500',
    textgray: '',
    hover: '',
    sidebar: '',
    iconhover: 'group-hover:',
    footerhover: 'hover:',
    widget: ''
  };
  
  const dark = {
    ...commonStyles,
    name: 'dark',
    text: 'text-white',
    tableheader: 'bg-gray-700',
    crossbg: 'text-gray-200',
    tabletext: 'text-gray-100',
    cross: 'bg-gray-700',
    deltext: 'text-gray-200',
    greybackground: 'bg-gray-900',
    whitebackground: 'bg-gray-800',
    hover: 'hover:bg-gray-900',
    iconhover: 'group-hover:text-white',
    footerhover: 'hover:text-white',
  };
  
  const light = {
    ...commonStyles,
    name: 'light',
    text: 'text-gray-700',
    tableheader: 'bg-gray-100',
    cross: 'bg-gray-200',
    crossbg: 'text-gray-800',
    tabletext: 'text-gray-900',
    greybackground: 'bg-gray-50',
    whitebackground: 'bg-white',
    hover: 'hover:bg-gray-100',
    deltext: 'text-gray-500',
    iconhover: 'group-hover:text-gray-900',
    footerhover: 'hover:text-gray-900',
    widget: 'text-slate-600'
  };
  
  export default {
    dark,
    light
  };
  