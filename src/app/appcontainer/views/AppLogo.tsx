/* eslint-disable max-len */
export const AppLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={132}
      height={38}
      viewBox="0 0 109 32"
    >
      <defs>
        <clipPath id="logo_svg__c">
          <path d="M0 0h109v32H0z" />
        </clipPath>
        <filter id="logo_svg__a" filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%">
          <feColorMatrix in="SourceGraphic" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
        </filter>
        <image
          id="logo_svg__b"
          width={109}
          height={32}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG0AAAAgCAYAAAAYPvbkAAAABmJLR0QA/wD/AP+gvaeTAAAAfUlEQVRoge3RoQ0CQRCG0eXAncHRBxXQAoZ+aAFNMSewVIHBEXAQkjkNySZg2Ex4Lxk34k++UgAAAAAAAAAAAOAvTVoP4FWcl32ZrxfVh8fq9sM5fCLu1008p1G/7a5rPZLviZaQaAmJlpBoCYmW0Kz1AN50h0uJ4Vh/2J9GL0El0nnYw+sAAAAASUVORK5CYII="
        />
        <mask id="logo_svg__e">
          <g filter="url(#logo_svg__a)">
            <use xlinkHref="#logo_svg__b" />
          </g>
        </mask>
        <g id="logo_svg__d" clipPath="url(#logo_svg__c)">
          <path
            d="M104.617 31.785a3.96 3.96 0 000-7.918 3.956 3.956 0 00-3.953 3.957c0 2.188 1.77 3.961 3.953 3.961"
            fillRule="evenodd"
            fill="#afca0b"
          />
        </g>
      </defs>
      <path
        d="M31.297.973h6.66v12.93L50.234.972h7.809L45.93 13.715l12.91 17.55h-7.895l-9.48-12.894-3.508 3.723v9.172h-6.66zm0 0M15.738 25.64c-5.187 0-9.09-4.328-9.09-9.519v-.344c0-5.195 3.903-9.52 9.09-9.52 3.457 0 5.575 1.384 7.95 3.544L27.3 4.87C24.344 1.921 21.203.113 15.758.113 6.852.113 0 6.993 0 15.691v.516c0 8.695 6.852 15.578 15.758 15.578 5.445 0 8.586-1.808 11.543-4.762l-3.613-4.93c-2.375 2.165-4.493 3.548-7.95 3.548"
        fillRule="evenodd"
        fill="#1d1c1b"
      />
      <path
        d="M95.934.957l-6.809 21.125L82.48.972h-4.605l-6.688 21.083L64.395.969l-6.692.004 9.82 30.28h6.723l5.899-18.878 6 18.879h6.707L102.66.957zm0 0"
        fillRule="evenodd"
        fill="#1d1c1b"
      />
      <use xlinkHref="#logo_svg__d" mask="url(#logo_svg__e)" />
    </svg>
  )
}
