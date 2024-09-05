import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { icons, images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox, Trending, VideoCard } from "../../components";
import { getLatestPosts } from "../../lib/appwrite";
import { useState } from "react";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  // const { data: posts } = useAppwrite(() => getUserPosts(user.$id));
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  // const [posts, setPosts] = useState();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* <FlatList
        data={latestPosts}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
          <Trending posts={latestPosts ?? []} />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={images.profile}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={posts.length || 0}
                // title={0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
      /> */}

      <ScrollView>
        <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
          <TouchableOpacity
            onPress={logout}
            className="flex w-full items-end mb-10"
          >
            <Image
              source={icons.logout}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>

          <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
            <Image
              source={images.profile}
              className="w-[90%] h-[90%] rounded-lg"
              resizeMode="cover"
            />
          </View>

          <InfoBox
            title={user?.username}
            containerStyles="mt-5"
            titleStyles="text-lg"
          />

          <View className="mt-5 flex flex-row">
            <InfoBox
              // title={posts.length || 0}
              title={0}
              subtitle="Posts"
              titleStyles="text-xl"
              containerStyles="mr-10"
            />
            <InfoBox title="1.2k" subtitle="Followers" titleStyles="text-xl" />
          </View>
        </View>

        <Trending posts={latestPosts ?? []} />

        {!latestPosts && (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
