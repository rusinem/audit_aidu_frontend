const multiSelectStyles = {
  container: (provided,state) => ({
    ...provided,
    minHeight: '50rem',
    height: 'auto',
    marginTop: '6rem',
    marginBottom: '6rem',
    cursor: !state.isDisabled ? 'pointer' : 'not-allowed',
    pointerEvents: 'auto'
  }),  
  control: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    minHeight: '50rem',
    height: 'auto',
    backgroundColor: !state.isDisabled ? 'rgb(245, 243, 255)' : 'rgba(63, 63, 138, 0.1)',
    pointerEvents: !state.isDisabled ? 'auto' : 'none',
    borderRadius: '25rem',
    border: 0,
    boxShadow: state.isFocused ? 0 : 0,
    
  }),
  valueContainer: provided => ({
    ...provided,
    position: 'relative',
    zIndex: 10,
    minHeight: '50rem',
    padding: '10rem',
  }),
  singleValue: provided => ({
    ...provided,
    fontSize: '18rem',
    fontWeight: '500',
    lineHeight: '28rem',
  }),
  multiValue: provided => ({
    ...provided,
    fontSize: '18rem',
    lineHeight: '22rem',
    fontWeight: '500',    
    borderRadius: '10rem',
    margin: '3rem 3rem',
    padding: '0rem 0rem 0rem 7rem',
    backgroundColor: 'rgba(63, 63, 138, 0.15)',    
  }),
  multiValueLabel: provided => ({
    ...provided,
    fontSize: '18rem',
    fontWeight: '500',
    lineHeight: '22rem',
  }),
  multiValueRemove: provided => ({
    ...provided,
    borderTopRightRadius:'10rem',
    borderBottomRightRadius: '10rem',
    paddingLeft: '7rem',
    paddingRight: '7rem',
  }),
  input: provided => ({
    ...provided,
    margin: 0,
    fontSize: '18rem',
    lineHeight: '28rem',
    fontWeight: '500',
    paddingLeft: '17rem'
  }),
  placeholder: provided => ({
    ...provided,
    margin: 0,
    fontSize: '18rem',
    fontWeight: '500',
    lineHeight: '28rem',
    paddingLeft: '17rem',
  }),
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    padding: 0,
    backgroundColor: 'rgb(245, 243, 255)',
    zIndex: '20',
    borderRadius: '15rem',
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: '180rem',
    paddingTop: '0rem',
    paddingBottom: '0rem',
    border: 0,
    borderRadius: '15rem',
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '16rem',
    fontWeight: '500',
    lineHeight: '20rem',
    paddingLeft: '27rem',
    backgroundColor: state.isFocused  ? 'rgb(245, 243, 255)' : '#fff',
    color: state.isFocused ? '#000' : '#000',
    ':active': {
      backgroundColor: 'rgb(245, 243, 255)',
    },
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    fontSize: '16rem',
    fontWeight: '500',
    lineHeight: '20rem',
    paddingLeft: '17rem',
    textAlign: 'left'
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    minHeight: '50rem',
    height: 'auto',
    paddingRight: '10rem'
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    width: '1rem',
    marginTop: '8rem',
    marginBottom: '8rem',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: '8rem',
  }),
}


export default multiSelectStyles;