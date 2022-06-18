import AWS = require("aws-sdk");
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

let AWS_configs = {
	aws_region: process.env["AWS-USER"],
	aws_profile: process.env["AWS-PASS"],
	aws_media_bucket: process.env["AWS-PASS"],
};

var credentials = new AWS.SharedIniFileCredentials({ profile: "" });
AWS.config.credentials = credentials;

export const s3 = new AWS.S3({
	signatureVersion: "v4",
	region: "us-east-2",
	params: { Bucket: "udagram-media-dev" },
});

export const getUrl: string = s3.getSignedUrl("getObject", {
	Bucket: "udagram-media-dev",
	Key: "photo.jpg",
	Expires: 60 * 5,
});

export const postUrl: string = s3.getSignedUrl("putObject", {
	Bucket: "udagram-media-dev",
	Key: "photo.jpg",
	Expires: 60 * 5,
});
