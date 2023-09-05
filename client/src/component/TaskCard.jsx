import { Badge, Box, Checkbox, CheckboxGroup, Flex, Stack,Text } from '@chakra-ui/react'
import React from 'react'
import {EditIcon} from "@chakra-ui/icons"
import { Link } from 'react-router-dom'

export const TaskCard = ({_id,title,tags,description,tasks_status,subTasks}) => {
    const checkbox=subTasks.filter((item)=>item.status).map((item)=>item.subTasksTitle)

  return (
    <Box>
        <Stack spacing={4} px={4} >
            <Flex justifyContent={'space-between'} alignItems={'center'} >
                <Text>{title}</Text>
                <Link to={`/task/${_id}`}><EditIcon/></Link>
            </Flex>
            <Stack direction={'row'}>
                {tags.length>0 && tags.map((item,ind)=><Badge key={ind} colorScheme='green'>{item}</Badge>)}
            </Stack>
            <Stack>
                <Text>{description}</Text>
            </Stack>
            <Stack>
                <CheckboxGroup defaultValue={checkbox}>

                    {subTasks.length>0 && subTasks.map((item,ind)=><Checkbox key={ind} value={item.subTasksTitle}>{item?.subTasksTitle}</Checkbox>)}
                </CheckboxGroup>
            </Stack>

        </Stack>
    </Box>
  )
}
