import { useState, useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { updateChallenge, deleteChallenge, uploadFiles } from "@/api/admin";
// import { encodeFile } from "../../util";

export default function AdminProblem({
  problem,
  update: updateClient,
  delete: deleteClient,
}: {
  problem: any;
  update: any;
  delete: any;
}) {
  console.log(problem);
  const [flag, setFlag] = useState(problem.flag);
  const handleFlagChange = useCallback((e: any) => setFlag(e.target.value), []);

  const [description, setDescription] = useState(problem.description);
  const handleDescriptionChange = useCallback(
    (e: any) => setDescription(e.target.value),
    []
  );

  const [category, setCategory] = useState(problem.category);
  const handleCategoryChange = useCallback(
    (e: any) => setCategory(e.target.value),
    []
  );

  const [author, setAuthor] = useState(problem.author);
  const handleAuthorChange = useCallback(
    (e: any) => setAuthor(e.target.value),
    []
  );

  const [name, setName] = useState(problem.name);
  const handleNameChange = useCallback((e: any) => setName(e.target.value), []);

  const [minPoints, setMinPoints] = useState(problem.points.min);
  const handleMinPointsChange = useCallback(
    (e: any) => setMinPoints(Number.parseInt(e.target.value)),
    []
  );

  const [maxPoints, setMaxPoints] = useState(problem.points.max);
  const handleMaxPointsChange = useCallback(
    (e: any) => setMaxPoints(Number.parseInt(e.target.value)),
    []
  );

  const [tiebreakEligible, setTiebreakEligible] = useState(
    problem.tiebreakEligible !== false
  );
  const handleTiebreakEligibleChange = useCallback(
    (e: any) => setTiebreakEligible(e.target.checked),
    []
  );

  const [image, setImage] = useState(problem.dynamic.image);
  const handleImageChange = useCallback(
    (e: any) => setImage(e.target.value),
    []
  );

  const [env, setEnv] = useState(problem.dynamic.env);
  const handleEnvChange = useCallback((e: any) => setEnv(e.target.value), []);

  const [type, setType] = useState(problem.dynamic.type);
  const handleTypeChange = useCallback((e: any) => {
    setType(e);
  }, []);

  // const handleFileUpload = useCallback(
  //   async (e:any) => {
  //     e.preventDefault();

  //     const fileData = await Promise.all(
  //       Array.from(e.target.files).map(async (file) => {
  //         const data = await encodeFile(file);

  //         return {
  //           data,
  //           name: file.name,
  //         };
  //       })
  //     );

  //     const fileUpload = await uploadFiles({
  //       files: fileData,
  //     });

  //     if (fileUpload.error) {
  //       toast.error(fileUpload.error);
  //       return;
  //     }

  //     const data = await updateChallenge({
  //       id: problem.id,
  //       data: {
  //         files: fileUpload.data.concat(problem.files),
  //       },
  //     });

  //     e.target.value = null;

  //     updateClient({
  //       problem: data,
  //     });

  //     toast.success("Problem successfully updated");
  //   },
  //   [problem.id, problem.files, updateClient]
  // );

  // const handleRemoveFile = (file: any) => async () => {
  //   const newFiles = problem.files.filter((f: any) => f !== file);

  //   const data = await updateChallenge({
  //     id: problem.id,
  //     data: {
  //       files: newFiles,
  //     },
  //   });

  //   updateClient({
  //     problem: data,
  //   });

  //   toast.success("Problem successfully updated");
  // };

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const data = await updateChallenge({
      id: problem.id,
      data: {
        flag,
        description,
        category,
        author,
        name,
        tiebreakEligible,
        points: {
          min: minPoints,
          max: maxPoints,
        },
        dynamic: {
          image,
          type,
          env,
        },
      },
    });

    updateClient({
      problem: data,
    });

    toast.success("Problem successfully updated");
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = useCallback((e: any) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  }, []);
  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);

    deleteClient({
      problem,
    });
  }, []);
  const handleDelete = useCallback(() => {
    const action = async () => {
      await deleteChallenge({
        id: problem.id,
      });

      toast.success(`${problem.name} successfully deleted`);

      closeDeleteModal();
    };
    action();
  }, [problem, closeDeleteModal]);

  return (
    <>
      <Card className="pt-6">
        <CardContent className="grid grid-cols-1 gap-2">
          <div className="flex flex-col md:flex-row md:justify-between gap-2">
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="Category"
                required
                value={category}
                onChange={handleCategoryChange}
              />
            </div>

            <div>
              <Label htmlFor="name">Problem Name</Label>
              <Input
                id="name"
                placeholder="Problem Name"
                required
                value={name}
                onChange={handleNameChange}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id={`chall-${problem.id}-tiebreak-eligible`}
              checked={tiebreakEligible}
              onChange={handleTiebreakEligibleChange}
            />
            <label
              htmlFor={`chall-${problem.id}-tiebreak-eligible`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Eligible for tiebreaks?
            </label>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="author">Author</Label>
            <Input
              required
              id="author"
              placeholder="Author"
              value={author}
              onChange={handleAuthorChange}
            />
          </div>

          <div className="flex flex-col md:flex-row md:justify-between gap-2">
            <div>
              <Label htmlFor="minPoints">min points</Label>
              <Input
                id="minPoints"
                required
                value={minPoints}
                onChange={handleMinPointsChange}
              />
            </div>
            <div>
              <Label htmlFor="maxPoints">max points</Label>
              <Input
                id="maxPoints"
                required
                value={maxPoints}
                onChange={handleMaxPointsChange}
              />
            </div>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="flag">Flag</Label>
            <Input
              required
              id="flag"
              placeholder="Flag"
              value={flag}
              onChange={handleFlagChange}
            />
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              placeholder="Type your description here."
              id="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>

          {/* 
          {problem.files.length !== 0 && (
            <div>
              <p className={`frame__subtitle m-0  `}>Downloads</p>
              <div className="tag-container">
                {problem.files.map((file: any) => {
                  return (
                    <div className="tag" key={file.url}>
                      <a download href={file.url}>
                        {file.name}
                      </a>
                      <div
                        className="tag tag--delete"
                        // style="margin: 0; margin-left: 3px"
                        onClick={handleRemoveFile(file)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )} */}
        </CardContent>

        <CardFooter className="flex justify-between	 gap-2 bg-gray-100 pt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Dynamic</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Dynamic</DialogTitle>
                <DialogDescription>
                  It allows you to dynamically create instances for each team
                  using docker and podman.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Image
                  </Label>
                  <Input
                    id="name"
                    value={image}
                    className="col-span-3"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Type
                  </Label>
                  <RadioGroup
                    defaultValue={type || "tcp"}
                    className="flex gap-2"
                    onValueChange={handleTypeChange}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tcp" id="tcp" />
                      <Label htmlFor="tcp">tcp</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="http" id="http" />
                      <Label htmlFor="http">http</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="env" className="text-right">
                    Env
                  </Label>
                  <Input
                    id="env"
                    value={env}
                    className="col-span-3"
                    onChange={handleEnvChange}
                  />

                  <p className="col-span-4 text-sm text-gray-500">
                    You can use this field to pass environment
                    variables/arguments to the docker container.
                  </p>

                  <p className="col-span-4 text-sm text-gray-500">
                    Example: <code>FLAG=flag{flag}</code>
                  </p>

                  <p className="col-span-4 text-sm text-gray-500">
                    You can also use the following predefined variables:
                  </p>

                  <p className="col-span-4 text-sm text-gray-500">
                    <code>FLAG</code> - The flag for the challenge
                  </p>
                  <p className="col-span-4 text-sm text-gray-500">
                    <code>PORT</code> - The port for the challenge
                  </p>
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button>Save Dynamic</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="flex gap-2">
            <Button onClick={handleUpdate}>Update</Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your challenge data from servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
