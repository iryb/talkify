import { Select, Button, Form, Input } from "antd";
import React from "react";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  level: "a1" | "a2" | "b1" | "b2" | "c1" | "c2";
  lessonTopic: string;
  grammarTopic: string;
  vocabulary: string[] | null;
  questions: string[] | null;
};

export const AddChat = () => {
  const { handleSubmit, control, reset } = useForm<FormData>({
    defaultValues: {
      level: "a1",
      lessonTopic: "Free topic",
      grammarTopic: "Free topic",
      vocabulary: null,
      questions: null,
    },
  });
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div>
      <h1>Add Chat</h1>
      <Form onFinish={onSubmit}>
        <Form.Item<FormData> label="English level" name="level">
          <Controller
            name="level"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  {
                    value: "a1",
                    label: "A1",
                  },
                  {
                    value: "a2",
                    label: "A2",
                  },
                  {
                    value: "b1",
                    label: "B1",
                  },
                  {
                    value: "b2",
                    label: "B2",
                  },
                  {
                    value: "c1",
                    label: "C1",
                  },
                  {
                    value: "c2",
                    label: "C2",
                  },
                ]}
              />
            )}
          />
        </Form.Item>

        <Form.Item<FormData> label="Lesson topic" name="lessonTopic">
          <Controller
            name="lessonTopic"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item<FormData> label="Grammar topic" name="grammarTopic">
          <Controller
            name="grammarTopic"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item<FormData> label="Vocabulary" name="vocabulary">
          <Controller
            name="vocabulary"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item<FormData> label="Questions" name="questions">
          <Controller
            name="questions"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Add Chat
        </Button>
      </Form>
    </div>
  );
};
