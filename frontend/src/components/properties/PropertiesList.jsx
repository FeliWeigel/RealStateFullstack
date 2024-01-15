/* eslint-disable react/prop-types */
import PropertyCard from './PropertyCard'

const PropertiesList = ({properties}) => {
    return (
        <>
            { properties.length != 0 ? 
            properties.map(property => {
                return ( 
                    <PropertyCard 
                        key={property.propertyId} 
                        property={property}
                    />
                )
            })
            : null
        }
        </>
    )
}

export default PropertiesList