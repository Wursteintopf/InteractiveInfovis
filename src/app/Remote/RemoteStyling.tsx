import styled from '@emotion/styled'

export const RemoteWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #28BCCA;
`

export const PhoneBackground = styled.div`
  height: 550px;
  width: 300px;
  background: black;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const Speaker = styled.div`
  height: 10px;
  width: 80px;
  background: white;
  border-radius: 5px;
  margin: 20px 0;
`

export const HomeButton = styled.div`
  height: 30px;
  width: 30px;
  background: white;
  border-radius: 50%;
  margin: 20px 0;
`

export const HomeScreen = styled.div`
  width: 270px;
  height: 450px;
  background: white;
  border-radius: 10px;
  padding: 20px;
`

export const RemoteHeader = styled.h2`
  font-weight: 200;
  margin: 0;
  text-align: center;
`

export const BlockWrapper = styled.div`
  width: 100%;
  margin: 30px 0;
`

export const RemoteButton = styled.button`
  width: 100%;
  background-color: #1487C2;
  border: none;
  padding: 7px 15px;
  border-radius: 10px;
  color: white;
  display: block;
  margin: 7px 0;
  cursor: pointer;
  transition: 0.3s;
  
  &:hover {
    background-color: #0573ab;
  }
`

export const BackButton = styled.div`
  width: 100%;
  background-color: #1487C2;
  border: none;
  padding: 7px 15px;
  border-radius: 10px;
  color: white;
  display: block;
  cursor: pointer;
  transition: 0.3s;
  font-size: 12px;

  &:hover {
    background-color: #0573ab;
  }

  &:before {
    content: '\\00AB';
    margin-right: 10px;
  }
`
