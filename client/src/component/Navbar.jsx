import { Avatar, Box, Button, Flex, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import {AddIcon, CloseIcon,HamburgerIcon} from "@chakra-ui/icons"
import { SideBar } from './SideBar'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  const {isOpen,onOpen,onClose}=useDisclosure()
  const bgCOlor=useColorModeValue('gray.100','gray.900')
  const links=['home', 'about', 'service','contact']

  return (
    <Box bg={bgCOlor} px={4}>
        <Stack>
          <Flex h={16} alignItems={'center'} justify={'space-between'}>
            <IconButton size={'md'} icon={isOpen?<CloseIcon/>:<HamburgerIcon/>} onClick={isOpen?onClose:onOpen} display={{md:'none'}}/>
            <HStack spacing={8}>
              <Box>logo</Box>
              <HStack spacing={4}  display={{base:"none",md:"flex"}}>
                {/* {links.length>0 && links.map((item,ind)=><NavLink key={ind}>{item}</NavLink>)} */}
                <Link to={'/task'}><Button colorScheme='teal' leftIcon={<AddIcon/>}>Add-task</Button></Link>
              </HStack>
            </HStack>
            <Flex>
              {/* <Button variant={'solid'} mr={4} colorScheme={'teal'}>Login</Button> */}
              <Menu>
                <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'}><Avatar/></MenuButton>
                <MenuList>
                  <MenuItem>login</MenuItem>
                  <MenuItem>login</MenuItem>
                  <MenuItem>login</MenuItem>
                </MenuList>
              </Menu>
            </Flex>

          </Flex>

        </Stack>
        {/* {isOpen?<Box display={{md:"none"}}>
          <Stack>
            {links.length>0 && links.map((item,ind)=><NavLink key={ind}>{item}</NavLink>)}
          </Stack>
        </Box>:null} */}
        {isOpen?<Stack maxW={'200px'}>
          <SideBar/>

        </Stack>:null}
    </Box>
  )
}

export const NavLink=({children})=>{
  return (
    <Box as='a' px={2} py={1} rounded={'md'} _hover={{
      textDecoration:'none',
      bg:useColorModeValue('gray.500','gray.500'),
    }} href={`/${children}`}>{children}</Box>
  )

}
