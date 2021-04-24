package com.caltrans.rusle.models;

public class Project {
	private final int mId;
	private final String mName;
	private final float mArea;
	private final String mStartDate;
	private final String mEndDate;
	private final String mLocation;
	private final String mDescription;
	private final String mSiteDetails;
	
	public Project(int id, String name, float area, String startDate, String endDate, String location, String description, String siteDetails) {
		mId = id;
		mName = name;
		mArea = area;
		mStartDate = startDate;
		mEndDate = endDate;
		mLocation = location;
		mDescription = description;
		mSiteDetails = siteDetails;
	}
	
	public int getId() {
		return mId;
	}
	
	public String getName() {
		return mName;
	}
	
	public float getArea() {
		return mArea;
	}
	
	public String getStartDate() {
		return mStartDate;
	}
	
	public String getEndDate() {
		return mEndDate;
	}
	
	public String getLocation() {
		return mLocation;
	}
	
	public String getDescription() {
		return mDescription;
	}
	
	public String getSiteDetails() {
		return mSiteDetails;
	}
	
	@Override
	public String toString() {
		return String.format("Id: %d, Name: %s, Area: %f, Start Date: %s, End Date: %s, Location: %s, Description: %s, Site Details: %s", mId, mName, mArea, mStartDate, mEndDate, mLocation, mDescription, mSiteDetails);
	}
}