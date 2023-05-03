import React, { Component } from "react";
import { View, Image, TextInput, Text, ScrollView, ImageBackground, Dimensions, TouchableOpacity, SafeAreaView, Linking,RefreshControl } from "react-native";
// import axios from 'axios';
// import ApiCall from "./ApiCall";
// import { portraitStyles, landscapeStyles ,styles} from "../Style/globleCss";
import Spinner from "react-native-loading-spinner-overlay";
import UiOrientation from "./UiOrientation";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from "react-native-ionicons";
import UseNet from "./screens/UseNet";
import Feather from 'react-native-vector-icons/Feather'
import { portraitStyles } from "../Style/globleCss";
import axios from "axios";
import ImageLazyLoading from "react-native-image-lazy-loading";
// import { SafeAreaInsetsContext } from "react-native-safe-area-context";
// import DeviceInfo from "react-native-device-info";
import SearchFilter from "./SearchFilter";



class HomeScreen extends UiOrientation {

  state = {
    refreshing: false,
    alldata:[],
    input:"",
    words: [
      {
        name:"C",
        id: "1",
      },
      {
        name:"python",
        id: "2",
      },
      {
        name:"java",
        id: "3",
      },
      {
        name:"php",
        id: "4",
      },
      {
        name:"react",
        id: "5",
      },
      {
        name:"kotlin",
        id: "6",
      },
      {
        name:"ruby",
        id: "7",
      },
      {
        name:"swift",
        id: "8",
      },
      {
        name:"AI",
        id: "9",
      }, {
        name:"Blockchain",
        id: "10",
      }
    ]
  };
  componentDidMount(){
    this.getData();
  }
  async getData(){
    let resp = await axios.get('https://echoit.in/craftslane-apis/homepage.php')
    this.setState({ alldata: resp.data.data })
  }
  _onRefresh = () => {
    this.render();
    this.setState({ refreshing: true });
    if(this.state.alldata.length > 0){
      this.setState({ refreshing: false });
    }
  }

  render() {
    // console.log("name",this.state.input);
    return (
      <SafeAreaView style={this.getStyle().screenBackgroundStackTab}>

        {this.state.alldata.length == false ? <View style={this.getStyle().loadingScreen}><Image source={require('../assets/loader-main-small.gif')} style={this.getStyle().cartImage} /></View> :
          <ImageBackground source={require('../assets/base-texture.png')} resizeMode="cover" onLayout={this.onLayout.bind(this)} >
            <ScrollView style={this.getStyle().container} nestedScrollEnabled={true} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={()=> this._onRefresh()}
            />}>
              {/* <Spinner visible={this.state.categories.length ? false : true} overlayColor="rgba(0, 0, 0, 0.58)" textContent='Loading...' textStyle={this.getStyle().loadingTextStyle} size={50} animation="slide" /> */}

              <View style={this.getStyle().searchBar}>
                <Feather name="search" color="#000" size={18} />
                <TextInput style={this.getStyle().textField} placeholder='Search' placeholderTextColor={'grey'} onChangeText={(t)=> this.setState({input:t})}/>
              </View>

              <SearchFilter data={this.state.words} input={this.state.input} />

              <View style={this.getStyle().headerTextContainer}>
                <Text style={this.getStyle().headerText}>Categories</Text>
              </View>
              <View>
                <ScrollView horizontal={true} style={this.getStyle().carosalSlide} showsHorizontalScrollIndicator={false}>
                  {this.state.alldata.map((data, idx) => (
                    <View style={this.getStyle().categoryImageContainer} key={idx}>
                      {data.categories.map((item, ind) => {
                        return (
                          <View style={this.getStyle().imageTextContainer} key={ind} >
                            <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('categories')} style={this.getStyle().imageContainer}>
                              <ImageLazyLoading style={this.getStyle().categoryImage} source={{ uri: item.image }} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} style={this.getStyle().textContainer} onPress={() => this.props.navigation.navigate('categories')}>
                              <Text
                                style={this.getStyle().categoryType}
                              >{item.title}</Text>
                            </TouchableOpacity>
                          </View>
                        )
                      })}
                    </View>
                  ))}
                </ScrollView>
              </View>

              <View style={this.getStyle().headerTextContainer}>
                <Text style={this.getStyle().headerText}>New Arrivals</Text>
                <Text style={this.getStyle().allText} onPress={() => this.props.navigation.navigate('newarrivals')}>See All</Text>
              </View>

              <View>
                <ScrollView horizontal={true} style={this.getStyle().carosalSlide} showsHorizontalScrollIndicator={false} >
                  {this.state.alldata.map((data, idx) => (
                    <View style={this.getStyle().categoryImageContainer} key={idx}>
                      {data.new_arrivals.map((item, ind) => {
                        return (
                          <View style={this.getStyle().imageTextContainer} key={ind} >
                            <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('product')} style={this.getStyle().imageContainer}>
                              <ImageLazyLoading style={this.getStyle().categoryImage} source={{ uri: item.image }} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('product')} style={this.getStyle().textContainer}>
                              <Text
                                style={this.getStyle().categoryType}
                                onPress={() => this.props.navigation.navigate('categories')}
                              >{item.title}</Text>
                            </TouchableOpacity>
                          </View>
                        )
                      })}
                    </View>
                  ))}
                </ScrollView>
              </View>



              <View style={this.getStyle().headerTextContainer}>
                <Text style={this.getStyle().headerText}>Popular Trends</Text>
                <Text style={this.getStyle().allText} onPress={() => this.props.navigation.navigate('populartrends')}>See All</Text>
              </View>


              <View >
                {this.state.alldata.map((data, idx) => (
                  <View style={this.getStyle().warpContainer} key={idx}>
                    {data.popular_trends.map((item, ind) => {
                      return (
                        <View style={this.getStyle().warpImageTextContainer} key={ind} >
                          <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('product')} style={this.getStyle().squareImageContainer}>
                            <ImageLazyLoading style={this.getStyle().popularImage} source={{ uri: item.image }} />
                          </TouchableOpacity>
                          <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('product')} style={this.getStyle().textContainer}>
                            <Text style={this.getStyle().categoryType}>{item.title}</Text>
                          </TouchableOpacity>
                        </View>
                      )
                    })}
                  </View>
                ))}
              </View>
              <View style={portraitStyles.headerTextContainer}>
                <Text style={this.getStyle().headerText}>Follow on Facebook & Instagram</Text>
              </View>

              {this.state.alldata.map((item, idx) => (
                <View style={this.getStyle().fotter} key={idx}>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL('https://www.instagram.com/craftslane/?hl=en')}>
                    <ImageLazyLoading style={this.getStyle().bannerImage} source={{ uri: item.footer_banner_1 }} />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL('https://www.facebook.com/CraftslaneIndia/')}>
                    <Image style={this.getStyle().bannerImage} source={{ uri: item.footer_banner_2 }} />
                  </TouchableOpacity>
                </View>
              ))}

            </ScrollView>
          </ImageBackground>
        }
      </SafeAreaView>
    );
  }
}
export default HomeScreen;