const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'col-span-1',
    'col-span-2',
    'col-span-3',
    'col-span-4',
    'col-span-5',
    'col-span-6',
    'col-span-7',
    'col-span-8',
    'col-span-9',
    'col-span-10',
    'col-span-11',
    'col-span-12',
    'ReactModal__Overlay',
    'ReactModal__Overlay--after-open',
    'ReactModal__Overlay--before-close',
    'content',
    'select__dropdown-indicator',
    'duration-500',
  ],
  theme: {
    screens: {
      desktop: '500px',
    },
    container: {
      center: true,
      maxWidth: {
        default: '1440px',
      },
    },
    spacing: {
      '90%': '90%',
      0: '0rem',
      1: '1rem',
      2: '2rem',
      3: '3rem',
      4: '4rem',
      5: '5rem',
      6: '6rem',
      7: '7rem',
      8: '8rem',
      9: '9rem',
      10: '10rem',
      11: '11rem',
      12: '12rem',
      13: '13rem',
      14: '14rem',
      15: '15rem',
      16: '16rem',
      17: '17rem',
      18: '18rem',
      19: '19rem',
      20: '20rem',
      21: '21rem',
      22: '22rem',
      23: '23rem',
      24: '24rem',
      25: '25rem',
      26: '26rem',
      27: '27rem',
      28: '28rem',
      29: '29rem',
      30: '30rem',
      31: '31rem',
      32: '32rem',
      33: '33rem',
      34: '34rem',
      35: '35rem',
      36: '36rem',
      40: '40rem',
      44: '44rem',
      45: '45rem',
      50: '50rem',
      55: '55rem',
      57: '57rem',
      60: '60rem',
      64: '64rem',
      65: '65rem',
      66: '66rem',
      70: '70rem',
      71: '71rem',
      75: '75rem',
      80: '80rem',
      90: '90rem',
      92: '92rem',
      95: '95rem',
      100: '100rem',
      106: '106rem',
      110: '110rem',
      118: '118rem',
      120: '120rem',
      125: '125rem',
      129: '129rem',
      130: '130rem',
      140: '140rem',
      145: '145rem',
      150: '150rem',
      155: '155rem',
      160: '160rem',
      165: '165rem',
      172: '172rem',
      170: '170rem',
      175: '175rem',
      180: '180rem',
      185: '185rem',
      190: '190rem',
      200: '200rem',
      205: '205rem',
      210: '210rem',
      215: '215rem',
      220: '220rem',
      225: '225rem',
      230: '230rem',
      235: '235rem',
      240: '240rem',
      245: '245rem',
      250: '250rem',
      256: '245rem',
      260: '260rem',
      262: '262rem',
      265: '265rem',
      275: '275rem',
      280: '280rem',
      285: '285rem',
      300: '300rem',
      305: '305rem',
      310: '310rem',
      315: '315rem',
      320: '320rem',
      325: '325rem',
      330: '330rem',
      335: '335rem',
      345: '345rem',
      350: '350rem',
      360: '360rem',
      370: '370rem',
      375: '375rem',
      380: '380rem',
      390: '390rem',
      400: '400rem',
      410: '410rem',
      425: '425rem',
      435: '435rem',
      440: '440rem',
      450: '450rem',
      460: '460rem',
      470: '470rem',
      480: '480rem',
      500: '500rem',
      535: '535rem',
      540: '540rem',
      570: '570rem',
      580: '580rem',
      591: '591rem',
      600: '600rem',
      610: '610rem',
      620: '620rem',
      625: '625rem',
      633: '633rem',
      645: '645rem',
      655: '655rem',
      665: '665rem',
      680: '680rem',
      750: '750rem',
      775: '775rem',
      780: '780rem',
      785: '785rem',
      788: '788rem',
      850: '850rem',
      865: '865rem',
      890: '890rem',
      900: '900rem',
      930: '930rem',
      935: '935rem',
      945: '945rem',
      950: '950rem',
      975: '975rem',
      980: '980rem',
      1000: '1000rem',
      1024: '1024rem',
      1025: '1025rem',
      1060: '1060rem',
      1135: '1135rem',
      1150: '1150rem',
      1160: '1160rem',
      1260: '1260rem',
    },
    fontFamily: {
      sans: ['CeraPro', 'Arial', 'sans-serif'],
    },
    fontSize: {
      8: '8rem',
      10: '10rem',
      12: '12rem',
      14: '14rem',
      16: '16rem',
      18: '18rem',
      20: '20rem',
      24: '24rem',
      26: '26rem',
      28: '28rem',
      30: '30rem',
      32: '32rem',
      36: '36rem',
      40: '40rem',
      56: '56rem',
    },
    lineHeight: {
      14: '14rem',
      16: '16rem',
      17: '17rem',
      18: '18rem',
      20: '20rem',
      25: '25rem',
      26: '26rem',
      28: '28rem',
      30: '30rem',
      34: '34rem',
      36: '36rem',
      38: '38rem',
      40: '40rem',
      44: '44rem',
      50: '50rem',
      56: '56rem',
      60: '60rem',
      66: '66rem',
    },
    letterSpacing: {
      tight: '-0.2rem',
    },
    textColor: theme => ({
      ...theme('colors'),
      leroymerlin: '#7CB41A',
      mechta: '#E61771',
      alser: '#00a153',
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      leroymerlin: '#7CB41A',
      mechta: '#E61771',
      alser: '#00a153',
    }),
    extend: {
      borderRadius: {
        10: '10rem',
        20: '20rem',
        25: '25rem',
      },
      borderWidth: {
        3: '3rem',
        6: '6rem',
      },
      boxShadow: {
        popup: '1px 3px 7px rgba(0, 0, 0, 0.2)',
      },
      spacing: {},
      maxWidth: {
        100: '100rem',
        125: '125rem',
      },
      maxHeight: {
        100: '100rem',
      },
      transitionDuration: {
        500: '500ms',
      },
    },
  },
  // variants: {
  //   container: [],
  //   extend: {
  //     backgroundColor: ['disabled'],
  //     textColor: ['disabled'],
  //     textOpacity: ['disabled'],
  //     borderColor: ['disabled'],
  //     cursor: ['disabled'],
  //     borderWidth: ['last'],
  //     margin: ['last'],
  //   },
  // },
  corePlugins: {
    container: false,
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@designbycode/tailwindcss-text-stroke'),
    plugin(function ({ addVariant, e }) {
      addVariant('disabled', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`disabled${separator}${className}`)}:disabled`;
        });
      });
    }),

    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '1440px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '50rem',
          paddingRight: '50rem',
        },
        '.container-adaptive': {
          maxWidth: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '20rem',
          paddingRight: '20rem',

          '@screen desktop': {
            maxWidth: '1440px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: '50rem',
            paddingRight: '50rem',
          },
        },
      });
    },
  ],
};
