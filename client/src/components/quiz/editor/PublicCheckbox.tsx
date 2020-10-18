import React, { useState } from 'react'

type Props = {
  defaultValue: boolean
  onChange: (checked: boolean) => void
  validate: boolean
}

const PublicCheckbox = ({ defaultValue, onChange, validate }: Props) => {
  const [checked, setChecked] = useState(defaultValue)

  return (
    <div className="row mb-4">
      <div className="col d-flex align-items-center">
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="publicCheckbox"
            checked={checked}
            onChange={e => {
              const {
                target: { checked }
              } = e
              setChecked(checked)
              onChange(checked)
            }}
          />
          <label className="custom-control-label" htmlFor="publicCheckbox">
            Public
          </label>
        </div>
      </div>
    </div>
  )
}

export default PublicCheckbox
