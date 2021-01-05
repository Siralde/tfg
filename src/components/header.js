import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

let header = () => (
    <Menu fluid widths={3}>
        <Menu.Item>
            <Link to={`/`}>
                <h3>
                    Explorar
                </h3>
            </Link>
        </Menu.Item>

        <Menu.Item>
            <h1>
                Invest UP
            </h1>
        </Menu.Item>

       
        <Menu.Item>
            <Link to={`/createCampaign`}>
                <h3>
                    Crear Ronda
                </h3>
            </Link>
        </Menu.Item>
        
    </Menu>
);

 export default header;


// import React from 'react';
// import { Menu } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';

// export default () => (
//     <Menu fluid widths={3}>
//         <Menu.Item>
//             <Link to={`/`}>
//                 <h3>
//                     Explorar
//                 </h3>
//             </Link>
//         </Menu.Item>

//         <Menu.Item>
//             <h1>
//                 Invest UP
//             </h1>
//         </Menu.Item>

       
//         <Menu.Item>
//             <Link to={`/createCampaign`}>
//                 <h3>
//                     Crear Ronda
//                 </h3>
//             </Link>
//         </Menu.Item>
        
//     </Menu>
// );