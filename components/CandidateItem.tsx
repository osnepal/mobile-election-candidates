import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Send, ThumbsDown, ThumbsUp } from 'lucide-react-native';
import { Image, View } from 'react-native';
import { Text } from './ui/text';
import { Icon } from './ui/icon';
import { Candidate } from '@/lib/models';

interface CandidateCardProps {
  data: Candidate;
  onVote?: () => void;
}

export function CandidateCard({ data, onVote }: CandidateCardProps) {
  return (
    <Card className="h-fit w-full gap-2 bg-background/80 py-2 backdrop-blur-md">
      <CardHeader className="px-2">
        <Image
          className="h-[200px] w-[100%] select-none rounded-lg bg-blue-300 object-cover"
          source={data.avatar}
          alt={data.name}
        />
      </CardHeader>

      {data.verified && (
        <Badge
          variant="outline"
          className="absolute right-4 top-4 ml-auto border border-green-200 bg-background text-green-700 dark:border-green-900">
          <Text>Verified</Text>
        </Badge>
      )}
      <CardContent className="px-2 py-0">
        <View className="flex flex-col">
          <CardTitle className="text-base font-semibold">{data.name}</CardTitle>
          <Text className="text-sm text-muted-foreground">{data.party}</Text>
        </View>

        {data.votes === undefined && (
          <View className="flex flex-row">
            <Text className="text-sm text-muted-foreground">Votes:</Text>
            <Text className="font-medium">{data.votes}</Text>
          </View>
        )}
      </CardContent>

      <CardFooter className="gap-2 px-0">
        <Button variant="ghost" className="flex-1" onPress={onVote}>
          <Text className="text-green-700">Like</Text>
          <Icon className="text-green-700" as={ThumbsUp} />
        </Button>
        <Button variant="ghost" className="flex-1" onPress={onVote}>
          <Text className="text-red-700">Dislike</Text>
          <Icon className="text-red-700" as={ThumbsDown} />
        </Button>
        <Button variant="ghost" className="flex-1" onPress={onVote}>
          <Text>Share</Text>
          <Icon as={Send} />
        </Button>
      </CardFooter>
    </Card>
  );
}
