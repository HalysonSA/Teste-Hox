import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #000;
    ::-webkit-scrollbar-track {
background:#000;
}
::-webkit-scrollbar {
width:10px;
height: 10px;
}

 
/* aqui é a alça da barra, que demonstra a altura que você está na página
estou colocando uma cor azul clara nela*/
::-webkit-scrollbar-thumb {
background: #333;
}
  }
`;

export default GlobalStyle;
