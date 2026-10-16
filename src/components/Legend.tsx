export default function Legend() {
  return (
    <div className="legend">
      <div>
        <p className="legend-title">Control</p>
        <ul>
          <li>
            <span className="swatch swatch-halo swatch-halo-allied" />
            Allied
          </li>
          <li>
            <span className="swatch swatch-halo swatch-halo-japanese" />
            Japanese occupied
          </li>
          <li>
            <span className="swatch swatch-halo swatch-halo-other" />
            Other
          </li>
        </ul>
      </div>
      <div>
        <p className="legend-title">Events</p>
        <ul>
          <li>
            <span className="swatch swatch-japan" />
            Japanese
          </li>
          <li>
            <span className="swatch swatch-us" />
            United States and Allied
          </li>
          <li>
            <span className="swatch swatch-both" />
            Both sides
          </li>
          <li>
            <span className="swatch swatch-shape swatch-circle" />
            Combat
          </li>
          <li>
            <span className="swatch swatch-shape swatch-square" />
            Base
          </li>
          <li>
            <span className="swatch swatch-shape swatch-diamond" />
            Intelligence
          </li>
        </ul>
      </div>
      <p className="legend-note">
        On All, Attu and Kiska are neutral because they changed hands. A number means more than one
        event at that place.
      </p>
    </div>
  );
}
