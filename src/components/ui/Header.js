import React, {useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';


export default function Header(){
    const {user, clearData} = useContext(UserContext);
    let history = useHistory();

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const goToMyPosts = () => {
        history.push('/my-posts');
    }

    const goToMyLikes = () => {
        history.push('/my-likes');
    }

    const logout = () => {
        history.push('/');
        clearData();
    }

    return(
        <HeaderContainer>
            {/* link here only for debugging purposes */}
            <Link to='/'>
                <LogoTitle onClick={() => clearData()}>linkr</LogoTitle> 
            </Link>
            <HeaderMenu>
                {showMenu?
                    <Button onClick={() => toggleMenu()}>
                        <IoIosArrowForward
                            color={'white'}
                            font-size={'32px'}
                        />
                    </Button>
                :
                    <Button onClick={() => toggleMenu()}>
                        <IoIosArrowBack
                            color={'white'}
                            font-size={'32px'}
                        />
                    </Button>
                }  
                <ProfilePic
                    draggable={false}
                    src={user.avatar}
                />
                <MenuOptions show={showMenu}>
                    <a onClick={() => goToMyPosts()}>My posts</a>
                    <a onClick={() => goToMyLikes()}>My likes</a>
                    <a onClick={() => logout()}>Logout</a>
                </MenuOptions>
            </HeaderMenu>
        </HeaderContainer>
    )
}


const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    height:80px;
    width: 100vw;
    background: var(--backgroundBlack);
    padding: 5px 10px;
`;

const HeaderMenu = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 165px;
    height: 100%;
`;

const MenuOptions = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    height: 150px;
    width: 200px;
    margin-top: 80px;
    position: fixed;
    top: 0px;
    right: ${props => (props.show ? 0 : 'calc(100vw * (-1))')}; // zero quando for mostrar
    z-index: 2;
    transition: 300ms all;
    background: var(--backgroundBlack);
    border-bottom-left-radius: 35px;

    a{
        color: #ffffff;
        font-family: var(--fontLato);
        font-size: 26px;
        cursor: pointer;
    }
`;

const LogoTitle = styled.h1`
    font-family: var(--fontLogo);
    font-weight: 700;
    font-size: 70px;
    color: #ffffff;
`;

const Button = styled.button`
    background: none;
	border: none;
	padding: 0;
    cursor: pointer;

    :focus{
        outline: none;
    }
`;

const ProfilePic = styled.img`
    height: 65px;
    width: 65px;
    border-radius: 50%;
    margin-right: 20px;
    object-fit: cover;
`;