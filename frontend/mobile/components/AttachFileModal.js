import { View, Text, Platform, Image } from "react-native";
import React, { Children, useEffect, useState } from "react";
import { Box, Button, Icon, IconButton, Modal, VStack } from "native-base";
import { Entypo } from "@expo/vector-icons";
import ImagePicker from "react-native-image-picker";
const AttachFileModal = ({ setImage }) => {
  const [tempImage, setTempImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const _uploadImage = () => {
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.launchImageLibrary((response) => {
      console.log("Response=", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("Image Picker Error", response.error);
      } else {
        const uri = response.uri;
        const type = "image/jpg";
        const name = response.fileName;
        const source = { uri, type, name };
        console.log(source);
        handleUpdata(source);
      }
    });
  };

  const handleUpdata = (photo) => {
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "chat-chit");
    data.append("cloud_name", "voluu");
    fetch("https://api.cloudinary.com/v1_1/voluu/image/upload", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data.url);
        setModalVisible(false);
        console.log(data);
      })
      .catch((err) => {
        Alert.alert("Error While Uploading");
      });
  };

  const _takePhoto = () => {
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "Image_Italy_",
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log("Response=", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("Image Picker Error", response.error);
      } else {
        const uri = response.uri;
        const type = "image/jpg";
        const name = response.fileName;
        const source = { uri, type, name };
        console.log(source);
        handleUpdata(source);
      }
    });
  };

  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        justifyContent="flex-end"
        bottom="4"
        size="lg"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Select Attachment File</Modal.Header>
          <Modal.Body>
            {tempImage ? (
              <Image
                source={{ uri: tempImage }}
                style={{ width: "100%", height: 200 }}
              />
            ) : (
              <Text>Choose an image to send</Text>
            )}
          </Modal.Body>
          <Modal.Footer>
            {tempImage && (
              <Button
                mr="2"
                onPress={() => {
                  _uploadImage();
                }}
              >
                Chooose image
              </Button>
            )}
            <Button onPress={() => _uploadImage()} flex="1">
              <Text className="text-center text-white">
                Select an {tempImage && "other"} image from camera roll
              </Text>
            </Button>
            <Button
              variant={"ghost"}
              colorScheme={"danger"}
              onPress={() => setModalVisible(false)}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <VStack space={8} alignItems="center">
        <IconButton
          zIndex={10}
          colorScheme="dark"
          variant="ghost"
          icon={
            <Icon
              as={<Entypo name="attachment" size={24} color="black" />}
              size={5}
              color="blue.400"
            />
          }
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        ></IconButton>
      </VStack>
    </>
  );
};

export default AttachFileModal;
