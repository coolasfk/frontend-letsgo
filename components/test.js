const MyComponent = () => {
    const [fileUri, setFileUri] = useState(null);
  
    const handleChooseFile = async () => {
      // Request permission to access camera roll
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (status !== 'granted') {
        ('Permission to access camera roll denied');
        return;
      }
  
      // Open image picker to select PNG file
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });
  
      if (!result.cancelled) {
        setFileUri(result.uri);
      }
    };
  
    const handleUploadFile = async () => {
      // Construct form data with PNG file
      const formData = new FormData();
      formData.append('file', {
        uri: fileUri,
        type: 'image/png',
        name: 'myimage.png',
      });
  
      // Send POST request to server
      const response = await fetch('https://myserver.com/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.ok) {
        ('PNG file uploaded successfully');
      } else {
        ('Error uploading PNG file');
      }
    };



    const MyComponent = () => {
        const [fileUri, setFileUri] = useState(null);
      
        const handleChooseFile = async () => {
          // Open file picker to select PNG file
          const result = await DocumentPicker.getDocumentAsync({ type: 'image/png' });
      
          if (result.type === 'success') {
            setFileUri(result.uri);
          }
        };
      
        const handleUploadFile = async () => {
          // Read PNG file as binary data
          const fileData = await FileSystem.readAsStringAsync(fileUri, { encoding: 'base64' });
      
          // Construct headers with content type and length
          const headers = {
            'Content-Type': 'image/png',
            'Content-Length': fileData.length,
          };
      
          // Send POST request to server
          const response = await fetch('https://myserver.com/upload', {
            method: 'POST',
            body: fileData,
            headers: headers,
          });
      
          if (response.ok) {
            ('PNG file uploaded successfully');
          } else {
            ('Error uploading PNG file');
          }
        };
      
        return (
          <View>
            <Button title="Choose PNG file" onPress={handleChooseFile} />
            <Button title="Upload PNG file" onPress={handleUploadFile} disabled={!fileUri} />
          </View>
        );
      };
  
    return (
      <View>
        {fileUri && <Image source={{ uri: fileUri }} style={{ width: 200, height: 200 }} />}
        <Button title="Choose PNG file" onPress={handleChooseFile} />
        <Button title="Upload PNG file" onPress={handleUploadFile} disabled={!fileUri} />
      </View>
    );
  };
  
  export default MyComponent;