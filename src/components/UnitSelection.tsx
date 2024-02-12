import { UnitDropdown } from "./UnitDropdown"

export function UnitSelection({unitCodes, disabled}:{unitCodes: string[], disabled:boolean}) {
    return (
        <UnitDropdown unitCodes={unitCodes} disabled={disabled} />
        )
}