
function Spinner() {
  return (
    <div className="py-24">
      <svg
        xmlns='http://www.w3.org/2000/svg'
        style={{margin: 'auto', background: 'transparent'}}
        width='120'
        height='120'
        display='block'
        preserveAspectRatio='xMidYMid'
        viewBox='0 0 100 100'
      >
        <circle cx='50' cy='50' r='30' fill='none' stroke='#a8b2ff' strokeWidth='10'></circle>
        <circle
          cx='50'
          cy='50'
          r='30'
          fill='none'
          stroke='#5d6fff'
          strokeLinecap='round'
          strokeWidth='8'
        >
          <animateTransform
            attributeName='transform'
            dur='1s'
            keyTimes='0;0.5;1'
            repeatCount='indefinite'
            type='rotate'
            values='0 50 50;180 50 50;720 50 50'
          ></animateTransform>
          <animate
            attributeName='stroke-dasharray'
            dur='1s'
            keyTimes='0;0.5;1'
            repeatCount='indefinite'
            values='18.84955592153876 169.64600329384882;94.2477796076938 94.24777960769377;18.84955592153876 169.64600329384882'
          ></animate>
        </circle>
      </svg>
    </div>
  );
}

export default Spinner;
