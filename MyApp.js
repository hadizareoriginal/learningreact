import React, { Component } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";

const WEBVIEW_REF = "WEBVIEW_REF";

export default class MyApp extends Component {
  constructor(props) {
    super(props);
    this.state = { canGoBack: false };
  }

  render() {
    let JS =
      '<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';
    let source =
      JS +
      '<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="und" dir="ltr"><a href="https://twitter.com/hashtag/WWIII?src=hash&amp;ref_src=twsrc%5Etfw">#ZZZWWIII</a> <a href="https://twitter.com/hashtag/WorldWarThree?src=hash&amp;ref_src=twsrc%5Etfw">#WorldWarThree</a> <a href="https://t.co/GVONjMP9cr">pic.twitter.com/GVONjMP9cr</a></p>&mdash; Hadi | هادی (@originaltimez) <a href="https://twitter.com/originaltimez/status/1213736487784787971?ref_src=twsrc%5Etfw">January 5, 2020</a></blockquote>';

    let tweethtml = `<!DOCTYPE html>\
    <html>\
      <head>\
        <meta charset="utf-8">\
        <meta name="viewport" content="width=device-width, initial-scale=1.0">\
        </head>\
        <body>\
          ${source}\
        </body>\
    </html>`;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Browser!</Text>
        <View style={styles.topbar}>
          <TouchableOpacity
            disabled={!this.state.canGoBack}
            onPress={this.onBack.bind(this)}
          >
            <Text
              style={
                this.state.canGoBack
                  ? styles.topbarText
                  : styles.topbarTextDisabled
              }
            >
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
        <WebView
          ref={WEBVIEW_REF}
          style={{ flex: 1 }}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          source={{ html: tweethtml }} // or uri : "https//site.com" *NOTE: no goback() with tweethtml
        />
      </View>
    );
  }
  onBack() {
    this.refs[WEBVIEW_REF].goBack();
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  title: {
    marginBottom: 10,
    marginTop: 15,
    marginLeft: 20,
    fontSize: 50,
    fontWeight: "bold"
  },
  parking: {
    backgroundColor: "white",
    borderRadius: 7,
    left: 20,
    padding: 10,
    marginVertical: 10
  },
  photo1: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 10,
    left: 20
  },
  parkings: {
    marginTop: 20
  },
  topbar: {
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  topbarText: {
    fontSize: 20,
    color: "blue"
  },
  topbarTextDisabled: {
    color: "red"
  }
});
