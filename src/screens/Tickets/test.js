{/* <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 10,
                          }}
                        >
                          <Text> Requester </Text>
                          <View style={styles.assignedTOContainer}>
                            <Image
                              style={styles.img}
                              source={require('../../assets/user.png')}
                            />

                            <TextInput
                              editable={false}
                              style={styles.assignedTO}
                              placeholder="I am read only"
                              placeholderTextColor="#CBCBCB"
                              autoCapitalize="none"
                              value={''}
                              onChangeText={(userName) => { }}
                              defaultValue={''}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                    <View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>Assigned To</Text>
                        <View style={styles.assignedTOContainer}>
                          <Image
                            style={styles.img}
                            source={require('../../assets/user.png')}
                          />

                          <TextInput
                            editable={false}
                            style={styles.assignedTO}
                            placeholder="I am read only"
                            placeholderTextColor="#CBCBCB"
                            autoCapitalize="none"
                            value={''}
                            onChangeText={(userName) => { }}
                            defaultValue={''}
                          />
                        </View>
                      </View>
                    </View>

                    <View style={styles.CategoryFieldPicker}>
                      <Text>Category</Text>
                      <View style={[styles.fieldPicker, { padding: 0 }]}>
                        <Picker
                          mode={'dropdown'}
                          style={[
                            styles.headerPicker,
                            { backgroundColor: '#FF5B57' },
                          ]}
                          selectedValue={Actions}
                          onValueChange={(itemValue, itemIndex) =>
                            setActions(itemValue)
                          }
                        >
                          <Picker.Item
                            label="Feature Request"
                            value="Feature Request"
                          />
                          <Picker.Item label="Disconect" value="Disconect" />
                          <Picker.Item label="Bug-Error" value="Bug-Error" />
                          <Picker.Item
                            label="Feature-Request"
                            value="Feature-Request"
                          />
                          <Picker.Item label="Sales" value="Sales" />
                          <Picker.Item label="Complaint" value="Complaint" />
                          <Picker.Item label="Orders" value="Orders" />
                          <Picker.Item label="Other" value="Other" />
                        </Picker>
                      </View>
                    </View>
                    <View>
                      <View style={styles.CategoryFieldPicker}>
                        <Text>Sub-category</Text>
                        <View style={styles.fieldPicker}>
                          <TextInput
                            editable={false}
                            style={{ paddingLeft: 10 }}
                            placeholder="I am read only"
                            placeholderTextColor="#CBCBCB"
                            autoCapitalize="none"
                            value={''}
                            onChangeText={(userName) => { }}
                            defaultValue={''}
                          />
                        </View>
                      </View>
                    </View>
                    {deviceType === 'Tablet' ? (
                      <>
                        <View style={styles.CategoryFieldPicker}>
                          <Text>Priority</Text>
                          <View style={[styles.fieldPicker, { padding: 0 }]}>
                            <Picker
                              mode={'dropdown'}
                              style={[
                                styles.headerPicker,
                                { backgroundColor: '#2ECC71' },
                              ]}
                              selectedValue={Actions}
                              onValueChange={(itemValue, itemIndex) =>
                                setActions(itemValue)
                              }
                            >
                              <Picker.Item label="High" value="High" />
                              <Picker.Item label="Normal" value="Normal" />
                              <Picker.Item label="Low" value="Low" />
                              <Picker.Item label="Urgent" value="Urgent" />
                            </Picker>
                          </View>
                        </View>
                        <View style={styles.CategoryFieldPicker}>
                          <Text>Status</Text>
                          <View style={[styles.fieldPicker, { padding: 0 }]}>
                            <Picker
                              mode={'dropdown'}
                              style={[
                                styles.headerPicker,
                                { backgroundColor: '#2ECC71' },
                              ]}
                              // dropdownIconColor='black'
                              selectedValue={Actions}
                              onValueChange={(itemValue, itemIndex) =>
                                setActions(itemValue)
                              }
                            >
                              <Picker.Item label="New" value="New" />
                              <Picker.Item label="Onhold" value="Onhold" />
                              <Picker.Item label="Archived" value="Archived" />
                              <Picker.Item label="Reopen" value="Reopen" />
                            </Picker>
                          </View>
                        </View>
                      </>
                    ) : (
                      <View style={styles.statusAndPriorityContainer}>
                        <View
                          style={[
                            styles.CategoryFieldPicker,
                            styles.CategoryFieldPicker2,
                          ]}
                        >
                          <Text>Priority</Text>
                          <View
                            style={[
                              styles.fieldPicker,
                              { padding: 0, marginRight: 10, width: '100%' },
                            ]}
                          >
                            <Picker
                              mode={'dropdown'}
                              style={[
                                styles.headerPicker,
                                { backgroundColor: '#2ECC71' },
                              ]}
                              selectedValue={Actions}
                              onValueChange={(itemValue, itemIndex) =>
                                setActions(itemValue)
                              }
                            >
                              <Picker.Item label="High" value="High" />
                              <Picker.Item label="Normal" value="Normal" />
                              <Picker.Item label="Low" value="Low" />
                              <Picker.Item label="Urgent" value="Urgent" />
                            </Picker>
                          </View>
                        </View>
                        <View
                          style={[
                            styles.CategoryFieldPicker,
                            styles.CategoryFieldPicker2,
                          ]}
                        >
                          <Text>Status</Text>
                          <View
                            style={[
                              styles.fieldPicker,
                              { padding: 0, marginLeft: 10, width: '100%' },
                            ]}
                          >
                            <Picker
                              mode={'dropdown'}
                              style={[
                                styles.headerPicker,
                                { backgroundColor: '#2ECC71' },
                              ]}
                              // dropdownIconColor='black'
                              selectedValue={Actions}
                              onValueChange={(itemValue, itemIndex) =>
                                setActions(itemValue)
                              }
                            >
                              <Picker.Item label="New" value="New" />
                              <Picker.Item label="Onhold" value="Onhold" />
                              <Picker.Item label="Archived" value="Archived" />
                              <Picker.Item label="Reopen" value="Reopen" />
                            </Picker>
                          </View>
                        </View>
                      </View>
                    )}
                    <View>
                      <View style={styles.CategoryFieldPicker}>
                        <Text>Department</Text>
                        <View style={styles.fieldPicker}>
                          <TextInput
                            editable={false}
                            style={{ paddingLeft: 10 }}
                            placeholder="I am read only"
                            placeholderTextColor="#CBCBCB"
                            autoCapitalize="none"
                            value={''}
                            onChangeText={(userName) => { }}
                            defaultValue={''}
                          />
                        </View>
                      </View>
                    </View>
                    <View>
                      <View style={styles.CategoryFieldPicker}>
                        <Text>Sub-department</Text>
                        <View style={styles.fieldPicker}>
                          <TextInput
                            editable={false}
                            style={{ paddingLeft: 10 }}
                            placeholder="I am read only"
                            placeholderTextColor="#CBCBCB"
                            autoCapitalize="none"
                            value={''}
                            onChangeText={(userName) => { }}
                            defaultValue={''}
                          />
                        </View>
                      </View>
                    </View>
                    <View>
                      <View style={styles.CategoryFieldPicker}>
                        <Text>Fields</Text>
                        <View style={styles.fieldPicker}>
                          <TextInput
                            editable={false}
                            style={{ paddingLeft: 10 }}
                            placeholder="I am read only"
                            placeholderTextColor="#CBCBCB"
                            autoCapitalize="none"
                            value={''}
                            onChangeText={(userName) => { }}
                            defaultValue={''}
                          />
                        </View>
                      </View>
                    </View>
                    <View>
                      <View style={styles.CategoryFieldPicker}>
                        <Text>Tags</Text>
                        <View style={styles.fieldPicker}>
                          <TextInput
                            editable={false}
                            style={{ paddingLeft: 10 }}
                            placeholder="I am read only"
                            placeholderTextColor="#CBCBCB"
                            autoCapitalize="none"
                            value={''}
                            onChangeText={(userName) => { }}
                            defaultValue={''}
                          />
                        </View>
                      </View>
                    </View>
                    <View>
                      <View style={styles.CategoryFieldPicker}>
                        <Text>Location</Text>
                        <View style={styles.fieldPicker}>
                          <TextInput
                            editable={false}
                            style={{ paddingLeft: 10 }}
                            placeholder="I am read only"
                            placeholderTextColor="#CBCBCB"
                            autoCapitalize="none"
                            value={''}
                            onChangeText={(userName) => { }}
                            defaultValue={''}
                          />
                        </View>
                      </View> 
                    </View>
                     {deviceType === 'Tablet' ? (
                      <>
                        <View>
                          <View style={styles.CategoryFieldPicker}>
                            <Text>Created On</Text>
                            <View style={styles.fieldPicker}>
                              <TextInput
                                editable={false}
                                style={{ paddingLeft: 10 }}
                                placeholder="I am read only"
                                placeholderTextColor="#CBCBCB"
                                autoCapitalize="none"
                                value={''}
                                onChangeText={(userName) => { }}
                                defaultValue={''}
                              />
                            </View>
                          </View>
                        </View>
                        <View>
                          <View style={styles.CategoryFieldPicker}>
                            <Text>Dead Line</Text>
                            <View style={styles.fieldPicker}>
                              <TextInput
                                editable={false}
                                style={{ paddingLeft: 10 }}
                                placeholder="I am read only"
                                placeholderTextColor="#CBCBCB"
                                autoCapitalize="none"
                                value={''}
                                onChangeText={(userName) => { }}
                                defaultValue={''}
                              />
                            </View>
                          </View>
                        </View>
                      </>
                    ) : (
                      <View style={styles.createdAndDeadlineContainer}>
                        <View
                          style={[
                            styles.CategoryFieldPicker,
                            styles.CategoryFieldPicker2,
                            styles.CategoryFieldPicker3,
                          ]}
                        >
                          <Text>Created On</Text>
                          <View
                            style={[
                              styles.fieldPicker,
                              { padding: 0, width: landscape ? '80%' : '60%' },
                            ]}
                          >
                            <TextInput
                              editable={false}
                              style={{ paddingLeft: 10 }}
                              placeholder="I am read only"
                              placeholderTextColor="#CBCBCB"
                              autoCapitalize="none"
                              value={''}
                              onChangeText={(userName) => { }}
                              defaultValue={''}
                            />
                          </View>
                        </View>
                        <View
                          style={[
                            styles.CategoryFieldPicker,
                            styles.CategoryFieldPicker3,
                            { paddingLeft: 5 },
                          ]}
                        >
                          <Text>Dead Line</Text>
                          <View
                            style={[
                              styles.fieldPicker,
                              { padding: 0, width: landscape ? '80%' : '60%' },
                            ]}
                          >
                            <TextInput
                              editable={false}
                              style={{ paddingLeft: 10 }}
                              placeholder="I am read only"
                              placeholderTextColor="#CBCBCB"
                              autoCapitalize="none"
                              value={''}
                              onChangeText={(userName) => { }}
                              defaultValue={''}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                    <View>
                      <View style={styles.CategoryFieldPicker}>
                        <Text>Reference</Text>
                        <View style={styles.fieldPicker}>
                          <TextInput
                            editable={false}
                            style={{ paddingLeft: 10 }}
                            placeholder="I am read only"
                            placeholderTextColor="#CBCBCB"
                            autoCapitalize="none"
                            value={''}
                            onChangeText={(userName) => { }}
                            defaultValue={''}
                          />
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        paddingHorizontal: 10,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        paddingVertical: 20,
                      }}
                    >
                      <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                        <QRCode
                          value={`Qr code value here`}
                          logoSize={50}
                          logoBackgroundColor="transparent"
                        />
                        <View>
                          <Text>Scan Me</Text>
                        </View>
                      </View>
                    </View>
                    {/* attachment section 
                       <View
                      style={{ paddingHorizontal: 10, backgroundColor: '#fff' }}
                    >
                      <View style={{ paddingVertical: 10 }}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginBottom: 5,
                          }}
                        >
                          Attachments
                        </Text>
                        <TouchableOpacity style={{ width: deviceWidth / 3 }}>
                          <Text
                            style={{
                              color: '#fff',
                              backgroundColor: '#00ACAC',
                              padding: 5,
                              borderRadius: 5,
                            }}
                          >
                            Add Attachments
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          flex: 1,
                          width: '100%',
                        }}
                      >
                        {Array.apply(null, { length: 6 }).map((item, index) => (
                          <View style={styles.attachmentContainer} key={index}>
                            <FontAwesome5
                              style={{ position: 'absolute', top: 2, left: 3 }}
                              name="trash-alt"
                            ></FontAwesome5>
                            <FontAwesome5
                              style={{ position: 'absolute', top: 2, right: 3 }}
                              name="camera"
                            ></FontAwesome5>
                            <Text style={{ textAlign: 'center' }}>
                              Attachments here
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View> 
                    </View>
                  </>
                  ) : navPicker == 'sharing' ? (
                  <>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{ fontSize: 30, fontWeight: 'bold', color: 'green' }}
                      >
                        Share with others
                      </Text>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: Dimensions.get('screen').width * 0.8,
                          marginTop: 20,
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: '45%',
                            backgroundColor: 'green',
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 30,
                          }}
                        >
                          <Text style={{ color: 'white' }}>Copy sharing link</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            width: '45%',
                            backgroundColor: '#49B6D6',
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 30,
                          }}
                          onPress={() => addComponent()}
                        >
                          <Text style={{ color: 'white' }}>Add User/Email</Text>
                        </TouchableOpacity>
                      </View>
                      {components.map((component) => (
                        <View
                          key={component}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 30,
                            width: '100%',
                          }}
                        >
                          {counter > 1 && (
                            <TouchableOpacity
                              style={{
                                width: '45%',
                                backgroundColor: 'red',
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 30,
                              }}
                              onPress={() => removeComponent()}
                            >
                              <Text style={{ color: 'white' }}>Delete</Text>
                            </TouchableOpacity>
                          )}
                          <SharingInfo />
                        </View>
                      ))}

                      <TouchableOpacity
                        style={{
                          width: '45%',
                          backgroundColor: '#49B6D6',
                          height: 40,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 30,
                          marginTop: 20,
                        }}
                      >
                        <Text style={{ color: 'white' }}>Send invitation</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: Dimensions.get('screen').width,
                          height: 50,
                          backgroundColor: 'black',
                          marginTop: 20,
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                        }}
                        onPress={() => setAccordion1(!accordion1)}
                      >
                        <Text style={{ color: 'white', marginLeft: 10 }}>
                          Access Control List
                        </Text>
                      </TouchableOpacity>
                      {accordion1 && (
                        <>
                          <View
                            style={{
                              width: '70%',
                              height: 50,
                              backgroundColor: '#c4c4c4',
                              borderRadius: 30,
                              paddingLeft: 10,
                              marginTop: 10,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>
                              User: Dr. No
                            </Text>
                          </View>
                          <View
                            style={{
                              width: '70%',
                              height: 50,
                              backgroundColor: '#c4c4c4',
                              borderRadius: 30,
                              paddingLeft: 10,
                              marginTop: 20,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>
                              Email: info@gmail.com
                            </Text>
                          </View>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: '80%',
                              alignSelf: 'center',
                            }}
                          >
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '25%',
                                alignItems: 'center',
                              }}
                            >
                              <Checkbox
                                value={view}
                                onValueChange={setView}
                                style={{ marginRight: 10 }}
                              />
                              <Text
                                style={{
                                  fontSize: 15,
                                  fontWeight: 'bold',
                                  marginTop: 10,
                                  marginBottom: 10,
                                }}
                              >
                                View
                              </Text>
                            </View>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '25%',
                                alignItems: 'center',
                              }}
                            >
                              <Checkbox
                                value={comment}
                                onValueChange={setComment}
                                style={{ marginRight: 10 }}
                              />
                              <Text
                                style={{
                                  fontSize: 15,
                                  fontWeight: 'bold',
                                  marginTop: 10,
                                  marginBottom: 10,
                                }}
                              >
                                Comment
                              </Text>
                            </View>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '25%',
                                alignItems: 'center',
                              }}
                            >
                              <Checkbox
                                value={edit}
                                onValueChange={setEdit}
                                style={{ marginRight: 10 }}
                              />
                              <Text
                                style={{
                                  fontSize: 15,
                                  fontWeight: 'bold',
                                  marginTop: 10,
                                  marginBottom: 10,
                                }}
                              >
                                Edit
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              width: '100%',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => setShowCalendar(!showCalendar)}
                              style={{
                                marginTop: 20,
                                width: '30%',
                                height: 40,
                                backgroundColor: 'black',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 30,
                              }}
                            >
                              <Text
                                style={{
                                  color: 'white',
                                }}
                              >
                                Share Till
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                marginTop: 20,
                                width: '30%',
                                height: 40,
                                backgroundColor: 'red',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 30,
                              }}
                            >
                              <Text
                                style={{
                                  color: 'white',
                                }}
                              >
                                Delete
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                marginTop: 20,
                                width: '30%',
                                height: 40,
                                backgroundColor: 'green',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 30,
                              }}
                            >
                              <Text
                                style={{
                                  color: 'white',
                                }}
                              >
                                Submit
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              width: '90%',
                            }}
                          >
                            {showCalendar && (
                              <DatePickerFuture
                                testID="dateTimePicker"
                                value={date}
                                mode={'date'}
                                display="default"
                                onChange={(e, selectedDate) => {
                                  const currentDate = selectedDate || date;
                                  setShowCalendar(Platform.OS === 'ios');
                                  setDate(currentDate);
                                }}
                              />
                            )}
                          </View>
                        </>
                      )}
                      <TouchableOpacity
                        style={{
                          width: Dimensions.get('screen').width,
                          height: 50,
                          backgroundColor: 'black',
                          marginTop: 20,
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                        }}
                        onPress={() => setAccordion2(!accordion2)}
                      >
                        <Text style={{ color: 'white', paddingLeft: 10 }}>
                          Publicity
                        </Text>
                      </TouchableOpacity>
                      {accordion2 && (
                        <View style={{ width: '100%' }}>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              width: '95%',
                              alignItems: 'center',
                              marginTop: 20,
                            }}
                          >
                            <FontAwesome5
                              name="dot-circle"
                              size={24}
                              color="#D5DBE0"
                            />
                            <Text style={{ marginLeft: 10, color: 'black' }}>
                              Only users linsted in Access Control List haave access
                            </Text>
                          </View>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              width: '95%',
                              alignItems: 'center',
                              marginTop: 20,
                            }}
                          >
                            <FontAwesome5
                              name="dot-circle"
                              size={24}
                              color="#7FD5D5"
                            />
                            <Text style={{ marginLeft: 10, color: '#7FD5D5' }}>
                              Publish over the world
                            </Text>
                          </View>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              width: '95%',
                              alignItems: 'center',
                              marginTop: 20,
                            }}
                          >
                            <FontAwesome5
                              name="dot-circle"
                              size={24}
                              color="#FFADAB"
                            />
                            <Text style={{ marginLeft: 10, color: '#FFADAB' }}>
                              Access by having link for everyone
                            </Text>
                          </View>
                        </View>
                      )}
                      <TouchableOpacity
                        style={{
                          width: Dimensions.get('screen').width,
                          height: 50,
                          backgroundColor: 'black',
                          marginTop: 20,
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                        }}
                        onPress={() => setAccordion3(!accordion3)}
                      >
                        <Text style={{ color: 'white', paddingLeft: 10 }}>
                          Settings
                        </Text>
                      </TouchableOpacity>
                      {accordion3 && (
                        <View
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '90%',
                            alignSelf: 'center',
                            marginTop: 20,
                          }}
                        >
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              width: '50%',
                              alignItems: 'center',
                            }}
                          >
                            <Checkbox
                              value={check1}
                              onValueChange={setCheck1}
                              style={{ marginRight: 10 }}
                            />
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                marginTop: 10,
                                marginBottom: 10,
                              }}
                            >
                              Allow viewers to download, save, copy
                            </Text>
                          </View>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              width: '50%',
                              alignItems: 'center',
                              marginTop: 20,
                            }}
                          >
                            <Checkbox
                              value={check2}
                              onValueChange={setCheck2}
                              style={{ marginRight: 10 }}
                            />
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                marginTop: 10,
                                marginBottom: 10,
                              }}
                            >
                              Checkbox level 2
                            </Text>
                          </View>
                        </View>
                        )}
                        ) 
                </>
                      : null}
                      <View style={{ height: 100 }}></View>
                      </View>
                      </View> */}