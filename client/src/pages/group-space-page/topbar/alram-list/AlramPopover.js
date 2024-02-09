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

const AlramPopover = ({ alramList, isMobile }) => {
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
                            {isMobile ? null : <WrapItem>1</WrapItem>}
                        </Wrap>
                    </Button>
                </PopoverTrigger>

                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>알림함</PopoverHeader>
                    <PopoverBody>
                        <List spacing={3}>
                            {alramList.map((e) => (
                                <>
                                    <ListItem>
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
                                </>
                            ))}
                        </List>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    );
};

export default AlramPopover;
