import { BellIcon, CheckCircleIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Divider,
    Flex,
    Grid,
    GridItem,
    List,
    ListIcon,
    ListItem,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";

const NotificationPopover = ({ alramList, isMobile, clickHandler }) => {
    const doNotReadAlramList = alramList.filter((e) => !e.readOrNot);
    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <Button
                        marginX={isMobile ? "0.1em" : "1em"}
                        backgroundColor={"#FFD100"}
                        borderRadius={"50%"}
                        width={"50%"}
                        _hover={{ backgroundColor: "#3182CE" }}
                    >
                        <BellIcon></BellIcon>
                        {isMobile || !doNotReadAlramList.length ? null : (
                            <Wrap
                                position={"absolute"}
                                right={isMobile ? "0" : "-10%"}
                                top={isMobile ? "0" : "-10%"}
                                backgroundColor={"red"}
                                width={isMobile ? "30%" : "50%"}
                                height={isMobile ? "30%" : "50%"}
                                borderRadius={"50%"}
                                justify={"center"}
                            >
                                <WrapItem>{doNotReadAlramList.length}</WrapItem>
                            </Wrap>
                        )}
                    </Button>
                </PopoverTrigger>

                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>
                        <Text fontWeight={700}>알림함</Text>
                    </PopoverHeader>
                    <PopoverBody height={"40vh"} overflowY={"scroll"}>
                        <List spacing={3}>
                            {alramList.map((e, index) => (
                                <Box key={index}>
                                    <ListItem
                                        onClick={() => {
                                            clickHandler(e.notificationId);
                                        }}
                                        cursor={"pointer"}
                                    >
                                        <Box>
                                            <Grid
                                                templateRows="repeat(2, 1fr)"
                                                templateColumns="repeat(5, 1fr)"
                                                fontWeight={
                                                    e.readOrNot ? 300 : 700
                                                }
                                                color={
                                                    e.readOrNot
                                                        ? "dam.gray"
                                                        : "dam.black"
                                                }
                                            >
                                                <GridItem colSpan={5}>
                                                    <Flex
                                                        alignItems={"center"}
                                                        height="100%" // GridItem의 전체 높이를 채웁니다.
                                                        width="100%" // GridItem의 전체 너비를 채웁니다.
                                                    >
                                                        <Text>
                                                            {
                                                                e.notification_message_title
                                                            }
                                                        </Text>
                                                    </Flex>
                                                </GridItem>
                                                <GridItem colSpan={5}>
                                                    <Text>
                                                        {e.notificationContents}
                                                    </Text>
                                                </GridItem>
                                            </Grid>
                                        </Box>
                                    </ListItem>
                                    <Divider></Divider>
                                </Box>
                            ))}
                        </List>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    );
};

export default NotificationPopover;
