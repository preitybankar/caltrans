package com.caltrans.rusle.models;

public class R {
	private final float rValue;
	private final String location;

	public float getrValue() {
		return rValue;
	}

	public String getLocation() {
		return location;
	}
	
	public R(float rValue, String location) {
		this.rValue = rValue;
		this.location = location;
	}

	@Override
	public String toString() {
		return String.format("R value: %s, Location: %s", rValue, location);
	}
}
