import { Image, ScrollView, View } from 'react-native';
import React from 'react';
import Appbar from '@/components/Appbar';
import { Text } from '@/components/ui/text';
import { candidates } from '@/lib/fake';
import { useLocalSearchParams } from 'expo-router';

const CandidateProfile = () => {
  const { candidateId } = useLocalSearchParams();
  const receivedId = Number(candidateId.toString());
  const candidate = candidates.find((i) => i.id === receivedId);
  return (
    <>
      <Appbar title={candidate?.name} back />
      <ScrollView>
        <View className="gap-4 p-4">
          {/* <Image source={candidate?.avatar} className="h-[250px] w-[100%] rounded-lg" /> */}
          <Image
            source={candidate?.avatar}
            className="h-[200px] w-[200px] self-center rounded-full border-2"
          />
          <View className="gap-4">
            <View className="flex flex-1 gap-2 self-center">
              <TitleBody
                center
                title="Full Name:"
                bodyClassName="font-bold"
                body={candidate?.name}
              />
            </View>
            <View className="flex-row flex flex-wrap gap-4">
              <TitleBody className='py-2 px-4 rounded-xl bg-blue-50 dark:bg-gray-800' title="Affiliation:" body={candidate?.party} />
              <TitleBody title="Age:" body={34} />
              <TitleBody title="Votes:" body={candidate?.votes} />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default CandidateProfile;

const TitleBody = ({
  title,
  body,
  className,
  center = false,
  bodyClassName,
  titleClassName,
}: {
  title: string;
  body: string | number | undefined;
  className?: string | undefined;
  titleClassName?: string | undefined;
  bodyClassName?: string | undefined;
  center?: boolean;
}) => {
  return (
    <View className={className}>
      <Text className={`text-md ${center ? 'text-center' : 'text-left'} ${titleClassName}`}>
        {title}
      </Text>
      <Text className={`text-xl ${center ? 'text-center' : 'text-left'} ${bodyClassName}`}>
        {body || '-'}
      </Text>
    </View>
  );
};
