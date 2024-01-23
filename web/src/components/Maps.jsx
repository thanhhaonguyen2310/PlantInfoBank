import React from 'react'
import GoogleMapReact from 'google-map-react';

const logo = 'data:image/png;base64,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'
const AnyReactComponent = ({ logo }) => <div><img 
                                              src={logo}
                                              className='h-3 w-3 bg-contain bg-center'
                                              alt=""/>
                                        </div>;

export const Maps = ({province}) => {
    console.log(province)
    const defaultProps = {
        center: {
          lat: 14.0583,
          lng: 108.2772
        },
        zoom: 5
      };
    
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBRKjtyzqIF4wzNE99xQldW8GDtXlED7Zw" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {province?.count > 0 && province?.rows.map(item => {
            return (
                <AnyReactComponent
                    key={item?.id}
                    lat={item?.Provinece?.latitude}
                    lng={item?.Provinece?.longtitude
                    }
                    logo={logo}
                />
            )
        })}
        
      </GoogleMapReact>
    </div>
  )
}
