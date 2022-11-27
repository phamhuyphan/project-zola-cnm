import * as React from "react";

import { Box, Text, Center, Avatar, Button, AlertDialog } from "native-base";
import { FlatList, TouchableOpacity } from "react-native";
import { ChatState } from "../../providers/ChatProvider";
import axios from "axios";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
const link = "https://zolachatapp.herokuapp.com";
export default function FriendRequest() {
  const [friends, setFriends] = React.useState([]);

  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);
  const { user } = ChatState();
  const cancelRef = React.useRef(null);

  React.useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios.get(`${link}/api/friendRequest/request`, config).then((data) => {
      setFriends(data.data[0].user);
    });
  }, []);

  const FriendItem = ({ item }) => (
    <Box
      key={item._id}
      w="full"
      rounded="lg"
      flexDirection="row"
      justifyContent="space-between"
      mb={1}
      bg="white:alpha.20"
      p={4}
    >
      <Center flexDirection="row">
        <Avatar
          mr={2}
          size="lg"
          bg="green.500"
          source={{
            uri: item.pic ? item.pic : "no-links",
          }}
        ></Avatar>
        <Box>
          <Text color="white" fontWeight={"bold"} fontSize={"lg"}>
            {item.fullname}
          </Text>
          <Text color="white" fontSize={"sm"}>
            @{item.username}
          </Text>
          <Text color="white">{item.email}</Text>
        </Box>
      </Center>
      <Center>
        <TouchableOpacity>
          <Center>
            <FontAwesome name="check" size={24} color="teal" />
          </Center>
        </TouchableOpacity>
      </Center>
      <Center>
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          <Center>
            <MaterialCommunityIcons
              name="close-thick"
              size={24}
              color="darkred"
            />
          </Center>
        </TouchableOpacity>
      </Center>
    </Box>
  );

  return (
    <Box mt={1} flex={1} ml={2} mr={2}>
      <FlatList
        data={friends}
        renderItem={FriendItem}
        keyExtractor={(item) => item._id}
      ></FlatList>
      <Center>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Delete Friend</AlertDialog.Header>
            <AlertDialog.Body>
              This action cannot be reversed. Deleted data can not be recovered.
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                  ref={cancelRef}
                >
                  Cancel
                </Button>
                <Button colorScheme="danger" onPress={onClose}>
                  Delete
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
    </Box>
  );
}
