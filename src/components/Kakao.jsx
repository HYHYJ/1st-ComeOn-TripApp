import { useEffect } from 'react'
const { kakao } = window


function Kakao({data, selectMarker, setselectMarker, selectCategory, latitude=37.474690139678195 , longitude = 126.99379931705693 }) {

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 9
    };
    
    const map = new kakao.maps.Map(mapContainer, mapOption);

    const mapTypeControl = new kakao.maps.MapTypeControl();

    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    const imageSrc = selectCategory === "숙소" ? '/around-lodgingMarker.svg' : '/around-leisureMarker.svg',    
    imageSize = new kakao.maps.Size(45, 45), 
    imageOption = {offset: new kakao.maps.Point(50, 50)}; 

    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
   
    data.forEach(item => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(item.latitude, item.longitude),
        image: markerImage
      });

      let content = '<div class="wrap" style="border-radius:1rem; border:solid 0.1rem; border-color:#3264FF; padding:0.25rem;  background: white; transform:translate(1rem,-3.5rem);">' +
        '    <div class="info">' +
        '        <div class="body">' +
        '<div class="title" style="font-size:0.7rem; font-weight:bold; color:gray2">' +
        item.title +
        '</div>' +
        
        '        </div>' +
        '    </div>' +
        '</div>';
      
      const overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: new kakao.maps.LatLng(item.latitude, item.longitude)
      });

      
      kakao.maps.event.addListener(marker, 'click', function () {
        overlay.setMap(map);
        setselectMarker(item);
      });
    });
  }, []);

  return (
    <div id="map" className='w-[100%] h-[90vh] mt-[6rem]'></div>
  )
}


export default Kakao






export function Kakao1({setselectAddress}) {

  useEffect(()=>{
    const mapContainer = document.getElementById('map'), 
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 6
    };  

      
    const map = new kakao.maps.Map(mapContainer, mapOption); 

    
    const mapTypeControl = new kakao.maps.MapTypeControl();

    
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    const geocoder = new kakao.maps.services.Geocoder();

    const imageSrc = '/location-marker.svg',    
    imageSize = new kakao.maps.Size(33, 65), 
    imageOption = {offset: new kakao.maps.Point(35, 55)}; 

    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
    const markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); 

    const marker = new kakao.maps.Marker({
      position: markerPosition, 
      image: markerImage 
  }), 
        infowindow = new kakao.maps.InfoWindow({zindex:1 });

    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                let detailAddr = result[0].road_address ? result[0].road_address.address_name  : result[0].address.address_name;
                
                var latlng = mouseEvent.latLng; 
                
                marker.setPosition(mouseEvent.latLng);
                marker.setMap(map);
                setselectAddress(
                  {address: detailAddr,
                    latitude: latlng.getLat(),
                    longitude: latlng.getLng()
                })

            }   
        });
    });

    kakao.maps.event.addListener(map, 'idle', function() {
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
    
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
    }

    function searchDetailAddrFromCoords(coords, callback) {
       
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

   
    function displayCenterInfo(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            const infoDiv = document.getElementById('centerAddr');

            for(let i = 0; i < result.length; i++) {
                
                if (result[i].region_type === 'H') {
                    infoDiv.innerHTML = result[i].address_name;
                    break;
                }
            }
        }    
    }
      },[]
  )
  return (
    <>
    <div className="relative w-[100%] ">
        <div id="map" className='w-[100%] h-[85vh] mt-[4.7rem]'></div>
          <div className="absolute left-3 top-3 rounded-md bg-white z-10  shadow-md">
            <div className="title text-sm bg-primary rounded-t-md text-white w-[100%] px-2 pt-2 pb-[0.2rem] font-bold">지도중심기준 행정동 주소정보</div>
            <span id="centerAddr" className='block font-normal py-1 px-2 text-sm'></span>
        </div>
    </div>
    </>
  )
}



export function Kakao2({latitude , longitude, className}) {

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 4
    };
    
    const map = new kakao.maps.Map(mapContainer, mapOption);

    
    const mapTypeControl = new kakao.maps.MapTypeControl();

    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    const imageSrc = '/around-lodgingMarker.svg',   
    imageSize = new kakao.maps.Size(45, 45), 
    imageOption = {offset: new kakao.maps.Point(50, 50)}; 

    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
    
    const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(latitude, longitude),
        image: markerImage
    });

    marker.setMap(map);
    
  }, []);

  return (
    <div id="map" className={className}></div>
  )
}
